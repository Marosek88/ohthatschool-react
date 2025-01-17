# Generated by Django 3.0.3 on 2020-03-23 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0005_auto_20200309_1254'),
        ('educator', '0005_auto_20200224_2205'),
    ]

    operations = [
        migrations.AddField(
            model_name='educator',
            name='categories',
            field=models.ManyToManyField(blank=True, related_name='educators', to='course.Category'),
        ),
        migrations.DeleteModel(
            name='EducatorSettings',
        ),
    ]
