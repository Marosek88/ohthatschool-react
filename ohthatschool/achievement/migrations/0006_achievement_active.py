# Generated by Django 3.0.3 on 2020-03-30 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('achievement', '0005_auto_20200330_2256'),
    ]

    operations = [
        migrations.AddField(
            model_name='achievement',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
