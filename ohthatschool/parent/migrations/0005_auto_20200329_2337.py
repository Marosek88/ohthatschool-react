# Generated by Django 3.0.3 on 2020-03-29 23:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20200324_2023'),
        ('parent', '0004_auto_20200329_1626'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parent',
            name='id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='parent', serialize=False, to='accounts.UserProfile'),
        ),
    ]
