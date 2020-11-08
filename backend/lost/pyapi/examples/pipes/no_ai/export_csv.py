from lost.pyapi import script
import os
import pandas as pd
import json
import datetime

ENVS = ['lost']
ARGUMENTS = {'file_name' : { 'value':'annos.csv',
                            'help': 'Name of the file with exported bbox annotations.'}
            }

class ExportCsv(script.Script):
    def default(self, o):
        if isinstance(o, (datetime.date, datetime.datetime)):
            return o.isoformat()

    '''This Script creates a csv file from image annotations and adds a data_export
    to the output of this script in pipeline.
    '''
    def main(self):
        df = self.inp.to_df()
        csv_path = self.get_path(self.get_arg('file_name'), context='instance')
        df.to_csv(path_or_buf=csv_path,
                      sep=',',
                      header=True,
                      index=False)
        self.outp.add_data_export(file_path=csv_path)
        self.logger.info('Stored export to: {}'.format(csv_path))
        self.get_img_annos()

    def get_img_annos(self):
        dict_list = self.inp.to_list_of_dict()
        for img_anno in dict_list:
            self.logger.info('-------------image path: {}'.format(img_anno[0]['img.img_path']))
            self.logger.info(self.file_man.lostconfig.project_path)
            self.logger.info('----------------')
            img_path = img_anno[0]['img.img_path'].split('.')[0]+'-annotation.json'
            ext_path = os.path.join(self.file_man.lostconfig.project_path, img_path)
            img_anno_ss = self.get_subset_img_anno(img_anno)
            with open(ext_path, 'w') as fout:
                json.dump(img_anno_ss , fout, default=self.default, indent=4)

    def get_subset_img_anno(self, img_anno):
        img_anno_ss = []
        for each in img_anno:
            img_dict = {}
            img_dict['label_name'] = each['anno.lbl.name']
            img_dict['label_value'] = each['anno.anno_value']
            img_dict['cordinates'] = each['anno.data']
            img_anno_ss.append(img_dict)
        return img_anno_ss
            

if __name__ == "__main__":
    my_script = ExportCsv()
