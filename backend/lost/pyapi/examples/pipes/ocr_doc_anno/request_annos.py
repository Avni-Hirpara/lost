from lost.pyapi import script
import os
import random
import json
from urllib.request import Request, urlopen


ctpn_request_url = os.environ['CTPN_request']
ENVS = ['lost']
ARGUMENTS = {'polygon' : { 'value':'false',
                            'help': 'Add a dummy polygon proposal as example.'},
            'line' : { 'value':'false',
                            'help': 'Add a dummy line proposal as example.'},
            'point' : { 'value':'false',
                            'help': 'Add a dummy point proposal as example.'},
            'bbox' : { 'value':'false',
                            'help': 'Add a dummy bbox proposal as example.'}
            }
class RequestAnnos(script.Script):
    '''Request annotations for each image of an imageset.

    An imageset is basicly a folder with images.
    '''
    def main(self):
        for ds in self.inp.datasources:
            media_path = ds.path
            annos = []
            anno_types = []
            lbls = []
            for annotask in self.outp.anno_tasks:
                possible_labels = annotask.possible_label_df['idx'].values.tolist()
            if self.get_arg('polygon').lower() == 'true':
                polygon= [[0.1,0.1],[0.4,0.1],[0.2,0.3]]
                annos.append(polygon)
                anno_types.append('polygon')
                lbls.append(random.sample(possible_labels, 2))
            if self.get_arg('line').lower() == 'true':
                line= [[0.5,0.5],[0.7,0.7]]
                annos.append(line)
                anno_types.append('line')
                lbls.append(random.sample(possible_labels, 3))
            if self.get_arg('point').lower() == 'true':
                point= [0.8,0.1]
                annos.append(point)
                anno_types.append('point')
                lbls.append(random.sample(possible_labels, 1))
            if self.get_arg('bbox').lower() == 'true':
                box= [0.6,0.6,0.1,0.05]
                annos.append(box)
                anno_types.append('bbox')
                lbls.append(random.sample(possible_labels, 2))
            # request annotation only for 'jpg','jpeg', 'bmp' and 'png' image type
            imgfile_filter = ['.jpg','.jpeg','.bmp','.png'] 
            for dirpath, dirnames, filenames in os.walk(media_path):
                for file in filenames:
                    if any(file.endswith(filter) for filter in imgfile_filter):
                        img_path = os.path.join(media_path, dirpath, file)
                        try:
                            annos_data = self.read_annos_from_ctpn(img_path)
                            self.outp.request_bbox_annos(img_path=img_path, boxes=annos_data, labels=lbls)
                        except:
                            self.outp.request_annos(img_path=img_path, annos=annos, anno_types=anno_types, anno_labels=lbls)
                        self.logger.info('Requested annos for: {}'.format(img_path))

    def read_annos_from_ctpn(self, img_path):
        with open (img_path,'r') as img:
            image = base64.b64encode(img.read())
        ctpn_req_data = {'image':image.decode('utf-8')}
        
        headers = {"X-Request-ID":"1a8a3ca3-8a45-4cae-b165-43c962241e1a", "Content-Type":"application/json"}
        req = Request(ctpn_request_url, data=json.dumps(ctpn_req_data).encode("utf-8"), headers=headers)
        response = urlopen(req).read()
        res_data =json.loads(response.decode())
        
        roi_cor = res_data['roiCordinates']
        annos = []
        for each_roi in roi_cor:
            mid_x = each_roi['x']+each_roi['w']/2
            mid_y = each_roi['y']+each_roi['h']/2
            annos.append([mid_x, mid_y, each_roi['w'], each_roi['h']])
        self.logger.info('---- Annos in the file--: {}'.format(annos))
        return annos

if __name__ == "__main__":
    my_script = RequestAnnos() 
