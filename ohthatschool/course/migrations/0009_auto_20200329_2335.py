# Generated by Django 3.0.3 on 2020-03-29 23:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('educator', '0009_auto_20200329_2335'),
        ('course', '0008_auto_20200324_2022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='courses', to='educator.Educator'),
        ),
    ]
