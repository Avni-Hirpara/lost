#!/usr/bin/env python3

import argparse
from lost.db import model, access
from lost.logic import config
import logging
import os
import pandas as pd

logging.basicConfig(level=logging.INFO, format='(%(levelname)s): %(message)s')

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Import a tag directory into this lost instance')
    parser.add_argument('csv_file', nargs='?', action='store',
                        help='Path to the label tree in csv style.')
    args = parser.parse_args()

    lostconfig = config.LOSTConfig()
    dbm = access.DBMan(lostconfig)

    df = pd.read_csv(args.csv_file)
    df = df.where((pd.notnull(df)), None)

    tags = dbm.get_available_tags()
    tag_list = [tag.name for tag in tags]
    for index, row in df.iterrows():
        if row['name'] not in tag_list:
            tag = model.TagDirectory(name=row['name'], description=row['description'])
            dbm.add(tag)
            dbm.commit()

    # if tree.import_df(df) is None:
    #     logging.warning('LabelTree already present in database! {}'.format(args.csv_file))
    dbm.close_session()