# Generated by Django 3.0.3 on 2020-03-30 22:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0010_auto_20200330_1044'),
        ('educator', '0010_auto_20200330_1044'),
        ('student', '0007_auto_20200329_2336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='courses',
            field=models.ManyToManyField(blank=True, related_name='students', to='course.Course'),
        ),
        migrations.AlterField(
            model_name='student',
            name='educators',
            field=models.ManyToManyField(blank=True, related_name='students', to='educator.Educator'),
        ),
    ]