# Generated by Django 3.0.3 on 2020-02-24 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('parent', '0001_initial'),
        ('student', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='parent',
            name='children',
            field=models.ManyToManyField(related_name='parents', to='student.Student'),
        ),
    ]
