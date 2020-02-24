from datetime import datetime
from elasticsearch_dsl import Document, Date, Nested, Boolean, analyzer, InnerDoc, Completion, Keyword, Text, Integer, \
    Object, Float, Field, ScaledFloat

html_strip = analyzer('html_strip',
                      tokenizer="standard",
                      filter=["standard", "lowercase", "stop", "snowball"],
                      char_filter=["html_strip"]
                      )


class CategoryDocument(Document):
    """Category information"""
    name = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_category'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class CourseDocument(Document):
    """Course information"""
    tags = Keyword()
    owner = Keyword()
    course_id = Text(fields={'keyword': Keyword()})
    title = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})
    duration = Integer()
    price = ScaledFloat(scaling_factor=100)
    rating = ScaledFloat(scaling_factor=100)
    categories = Keyword()
    active = Boolean()

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_course'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class ModuleDocument(Document):
    """Course Module information"""
    course = Keyword()
    tags = Keyword()
    title = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})
    duration = Integer()
    rating = ScaledFloat(scaling_factor=100)
    active = Boolean()

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_module'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class LessonDocument(Document):
    """Course Class information"""
    course_guid = Keyword()
    module_guid = Keyword()
    tags = Keyword()
    title = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})
    duration = Integer()
    rating = ScaledFloat(scaling_factor=100)
    active = Boolean()

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_lesson'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


# class PeriodDocument(Document):
#     """Custom Periods uploaded through CoprPi"""
#     project_id = Integer()
#     period_id = Integer()
#     start = Date()
#     finish = Date()
#     created_at = Date()
#     updated_at = Date()
#
#     class Index:
#         name = 'period'
#
#     def save(self, **kwargs):
#         self.created_at = datetime.now()
#         return super().save(**kwargs)
#
#
# class RevitModelElementDocument(Document):
#     """Revit Elements extracted directly from Revit via CoprPi Plugin"""
#     id = Integer()
#     unique_id = Text(fields={'keyword': Keyword()})
#     project_id = Integer()
#     task_id = Text(fields={'keyword': Keyword()})
#     category = Text(fields={'keyword': Keyword()})
#     family = Text(fields={'keyword': Keyword()})
#     host = Text(fields={'keyword': Keyword()})
#     volume = Integer()
#     created_at = Date()
#     updated_at = Date()
#     parameters = Object()
#
#     class Index:
#         name = 'revit_model_element'
#
#     def save(self, **kwargs):
#         self.created_at = datetime.now()
#         return super().save(**kwargs)
#
#
# REVITMODELOBJECT_STATUS = {'new': 0, 'changed': 1, 'unchanged': 2}
#
#
# class RevitModelObjectDocument(Document):
#     """Revit Elements extracted from Revit into xls file and uploaded through CoprPi"""
#     project_id = Integer()
#     period_id = Integer()
#     discipline = Text(fields={'keyword': Keyword()})
#     category = Text(fields={'keyword': Keyword()})
#     family = Text(fields={'keyword': Keyword()})
#     type = Text(fields={'keyword': Keyword()})
#     batid = Text(fields={'keyword': Keyword()})
#     guid = Text(fields={'keyword': Keyword()})
#     floor = Text(fields={'keyword': Keyword()})
#     length = ScaledFloat(scaling_factor=100)
#     height = ScaledFloat(scaling_factor=100)
#     diameter = ScaledFloat(scaling_factor=100)
#     width = ScaledFloat(scaling_factor=100)
#     area = ScaledFloat(scaling_factor=100)
#     bottom_area = ScaledFloat(scaling_factor=100)
#     volume = ScaledFloat(scaling_factor=100)
#     bbox_width = ScaledFloat(scaling_factor=100)
#     bbox_length = ScaledFloat(scaling_factor=100)
#     bbox_height = ScaledFloat(scaling_factor=100)
#     global_x = ScaledFloat(scaling_factor=100)
#     global_y = ScaledFloat(scaling_factor=100)
#     global_z = ScaledFloat(scaling_factor=100)
#     status = Integer()
#     created_at = Date()
#     updated_at = Date()
#
#     class Index:
#         name = 'revit_model_object'
#
#     def save(self, **kwargs):
#         if not self.discipline:
#             self.discipline = 'undefined'
#         if not self.category:
#             self.category = 'undefined'
#         if not self.family:
#             self.family = 'undefined'
#         if not self.type:
#             self.type = 'undefined'
#         self.created_at = datetime.now()
#         return super().save(**kwargs)
#
#
# class ViewModelStatusDocument(Document):
#     project_id = Integer()
#     period_id = Integer()
#     discipline = Text(fields={'keyword': Keyword()})
#     category = Text(fields={'keyword': Keyword()})
#     family = Text(fields={'keyword': Keyword()})
#     type = Text(fields={'keyword': Keyword()})
#     total = Integer()
#     new = Integer()
#     changed = Integer()
#     unchanged = Integer()
#     area = ScaledFloat(scaling_factor=100)
#     volume = ScaledFloat(scaling_factor=100)
#     length = ScaledFloat(scaling_factor=100)
#     width = ScaledFloat(scaling_factor=100)
#     created_at = Date()
#     updated_at = Date()
#
#     class Index:
#         name = 'view_model_status'
#
#     def save(self, **kwargs):
#         if not self.discipline:
#             self.discipline = 'undefined'
#         if not self.category:
#             self.category = 'undefined'
#         if not self.family:
#             self.family = 'undefined'
#         if not self.type:
#             self.type = 'undefined'
#         if not self.total:
#             self.total = 0
#         if not self.new:
#             self.new = 0
#         if not self.changed:
#             self.changed = 0
#         if not self.unchanged:
#             self.unchanged = 0
#         if not self.area:
#             self.area = 0
#         if not self.volume:
#             self.volume = 0
#         if not self.length:
#             self.length = 0
#         if not self.width:
#             self.width = 0
#         self.created_at = datetime.now()
#
#         return super().save(**kwargs)
#
#
# class TaskPlanDocument(Document):
#     """Tasks extracted from P6 to xer file and uploaded through CoprPi"""
#     project_id = Integer()
#     unique_id = Integer()
#     name = Text(fields={'keyword': Keyword()})
#     created_at = Date()
#     updated_at = Date()
#     body = Object()
#
#     class Index:
#         name = 'task_plan'
#
#     def save(self, **kwargs):
#         self.created_at = datetime.now()
#         return super().save(**kwargs)
#
#
# class ResourcePlanDocument(Document):
#     """Resources extracted from P6 to xer file and uploaded through CoprPi"""
#     project_id = Integer()
#     unique_id = Integer()
#     name = Text(fields={'keyword': Keyword()})
#     created_at = Date()
#     updated_at = Date()
#     body = Object()
#
#     class Index:
#         name = 'resources_plan'
#
#     def save(self, **kwargs):
#         self.created_at = datetime.now()
#         return super().save(**kwargs)
#
#
# class ContractCompletionDocument(Document):
#     """Contract Completion entry for project based on xer file from P6 uploaded through CoprPi"""
#     project_id = Integer()
#     unique_id = Integer()
#     baseline_completion = Date()
#     forecast_completion = Date()
#     report_period = Date()
#     report_period_id = Integer()
#     created_at = Date()
#     updated_at = Date()
#
#     class Index:
#         name = 'contract_completion'
#
#     def save(self, **kwargs):
#         self.created_at = datetime.now()
#         return super().save(**kwargs)