if [ ${ADD_EXAMPLES} = "True" ]; then
python3 import_pipe_project.py '../pyapi/examples/pipes/ocr_doc_anno'
python3 import_label_tree.py '../pyapi/examples/label_trees/pancard_label_tree.csv'
    if [ ${ADD_AI_EXAMPLES} = "True" ]; then
    python3 import_pipe_project.py '../pyapi/examples/pipes/sia'
    python3 import_pipe_project.py '../pyapi/examples/pipes/mia'
    python3 import_pipe_project.py '../pyapi/examples/pipes/two_stage'
    fi
cp -r ../pyapi/examples/images/* $LOST_HOME/data/media
fi