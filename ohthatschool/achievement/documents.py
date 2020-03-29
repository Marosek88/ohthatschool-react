from datetime import datetime
from elasticsearch_dsl import Document, Date, Nested, Boolean, analyzer, InnerDoc, Completion, Keyword, Text, Integer, \
    Object, Float, Field, ScaledFloat, GeoPoint

html_strip = analyzer('html_strip',
                      tokenizer="standard",
                      filter=["standard", "lowercase", "stop", "snowball"],
                      char_filter=["html_strip"]
                      )


class AchievementDocument(Document):
    """Achievement information"""
    id = Keyword()
    name = Text(fields={'keyword': Keyword()})
    related_course = Keyword()
    related_educator = Keyword()
    related_parent = Keyword()
    related_student = Keyword()
    type = Keyword()
    image = Text(fields={'keyword': Keyword()})
    active = Boolean()

    created_at = Date()
    updated_at = Date()

    class Index:
        name = 'achievement_achievement'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.active = True
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)
