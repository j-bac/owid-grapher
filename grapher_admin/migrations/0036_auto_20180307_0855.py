# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-07 08:55
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('grapher_admin', '0035_auto_20180216_0144'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datavalue',
            name='fk_ent_id',
            field=models.ForeignKey(db_column='fk_ent_id', on_delete=django.db.models.deletion.DO_NOTHING, to='grapher_admin.Entity'),
        ),
    ]
