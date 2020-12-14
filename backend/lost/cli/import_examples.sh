if [ ${ADD_EXAMPLES} = "True" ]; then
pipe_dir='../pyapi/examples/pipes'
pipe_childs=$(find $pipe_dir ! -path $pipe_dir -type d)
for each in $pipe_childs
do
    python3 import_pipe_project.py $each
done


label_csv=$(find ../pyapi/examples/label_trees/ -type f -name "*.csv")
for each in $label_csv
do
    python3 import_label_tree.py $each
done
# python3 import_pipe_project.py '../pyapi/examples/pipes/ocr_doc_anno'
# python3 import_label_tree.py '../pyapi/examples/label_trees/pancard_label_tree.csv'
python3 import_tag_directory.py '../pyapi/examples/tag_directory/image_quality_tag.csv'

# cp -r ../pyapi/examples/images/* $LOST_HOME/data/media
fi