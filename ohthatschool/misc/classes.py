import uuid
from django.db import models
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


"""Using ViewSets from Django Rest Framework package and overriding its functionality to accommodate parallel 
Elasticsearch usage"""


class ElasticModelViewSet(viewsets.ModelViewSet):
    """Parent Class for all Elasticsearch related ViewSets"""
    # def __init__(self, es_document_class, model_class):
    #     self.es_document_class = es_document_class
    #     self.model_class = model_class
    #     super().__init__(self)

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        data = response.data
        # Add Elasticsearch data
        self.add_es_data(data)
        return response

    @action(detail=False, methods=['GET'])
    def list_filtered(self, request, *args, **kwargs):
        pass

    def create(self, request, *args, **kwargs):
        data = dict(request.data)
        response = super().create(request, *args, **kwargs)
        data['id'] = response.data['id']
        data['owner'] = response.data['owner']
        # Add entry to Elasticsearch
        result = ""
        count = 5
        # Try to create the entry in Elasticsearch 5 times
        while result != 'created' and count != 0:
            try:
                self.es_document_class.init()
                result = self.es_document_class(**data).save()
                break
            except:
                pass
            count -= 1
        if result == 'created':
            return response
        else:
            self.model_class.objects.get(id=response.data['id']).delete()
            return Response({"error_messages": {"elasticsearch": "Entry could not be created"}}, status=400)

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        data = response.data
        # Additional information from Elasticsearch
        self.add_es_data([data])
        return response

    def update(self, request, *args, **kwargs):
        if 'partial' not in kwargs:
            result = self.update_es(kwargs['pk'], request.data)
        else:
            result = kwargs['partial_result']
        if result == 'Updated':
            return super().update(request, *args, **kwargs)
        elif result == 'Elasticsearch entry not found':
            return Response({"error_messages": {"elasticsearch": "Elasticsearch entry not found"}}, status=400)
        elif result == "Couldn't connect to Elasticsearch":
            return Response({"error_messages": {"elasticsearch": "Couldn't connect to Elasticsearch"}})
        return Response({"error_messages": {"unknown": "Something went wrong"}}, status=400)

    def partial_update(self, request, pk=None, *args, **kwargs):
        partial_result = self.update_es(pk, request.data)
        return super().partial_update(request, partial_result=partial_result, *args, **kwargs)

    def destroy(self, request, pk=None, *args, **kwargs):
        result = self.update_es(pk, {'delete': True})
        if result == 'Updated':
            return super().destroy(request, *args, **kwargs)
        elif result == 'Elasticsearch entry not found':
            # return Response({"error_messages": {"elasticsearch": "Elasticsearch entry not found"}}, status=400)
            return super().destroy(request, *args, **kwargs)
        elif result == "Couldn't connect to Elasticsearch":
            # return Response({"error_messages": {"elasticsearch": "Couldn't connect to Elasticsearch"}})
            return super().destroy(request, *args, **kwargs)
        return Response({"error_messages": {"unknown": "Something went wrong"}}, status=400)

    def add_es_data(self, data_list):
        for item in data_list:
            if 'id' in item:
                success = False
                # Try to connect to Elasticsearch 5 times
                for i in range(5):
                    try:
                        es_entry = self.es_document_class.get(id=item['id'], ignore=404)
                        if es_entry:
                            for k, v in es_entry.to_dict().items():
                                if k not in item.keys():
                                    item[k] = v
                        else:
                            item['error_message'] = {"elasticsearch": "Elasticsearch entry missing!"}
                        success = True
                        break
                    except:
                        pass
                if not success:
                    item['error_message'] = {"elasticsearch": "Couldn't connect to Elasticsearch"}

    def update_es(self, es_id, request_dict):
        data = {}
        for key, value in request_dict.items():
            if key != 'id':
                data[key] = value
        # Try to update Elasticsearch 5 times
        result = "Couldn't connect to Elasticsearch"
        for i in range(5):
            try:
                es_entry = self.es_document_class.get(id=es_id, ignore=404)
                if es_entry:
                    es_entry.update(**data)
                    result = "Updated"
                else:
                    result = "Elasticsearch entry not found"
                break
            except:
                pass
        return result
