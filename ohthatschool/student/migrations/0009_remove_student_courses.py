# Generated by Django 3.0.3 on 2020-03-31 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0008_auto_20200330_2256'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='courses',
        ),
    ]