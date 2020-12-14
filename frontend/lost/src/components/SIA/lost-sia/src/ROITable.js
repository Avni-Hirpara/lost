import React, {Component} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class ROITable extends Component{

  constructor(props){
    super(props)
    this.state={
      annos:[],
      width: '100%',
      height: '100%',
      possibleLabels: []
    }
    this.renderEditableCell = this.renderEditableCell.bind(this);
    this.selectLabel = this.selectLabel.bind(this);
    this.onLabelROITableRowClick = this.onLabelROITableRowClick.bind(this);
  }

  componentDidUpdate(prevProps){
    if (prevProps !== this.props){
      this.setState({
        annos: this.props.annos,
        top: this.props.svg.top,
        left: this.props.svg.left,
        possibleLabels: this.props.possibleLabels
      })
    }
  }

  onLabelROITableRowClick(state, rowInfo, column, instance){
    return {
      onClick: e => {
        const annoId = rowInfo.original.id;
        this.props.selectAnnotation(annoId)
      }
    }
  }

  selectLabel(cellInfo){
    if(cellInfo.original.mode === 'create'){
      return 'no label'
    }
    else if(cellInfo.original.mode === 'view' || cellInfo.original.mode === 'editLabel'){
      if (this.props.possibleLabels == undefined){
        return 'no label'
      }
      const label_object = this.props.possibleLabels.filter(label => label.id === cellInfo.original.labelIds[0]);
      return label_object.length > 0 ? label_object[0].label :  'no label'
    }
    return cellInfo.value
  }

  renderEditableCell(cellInfo){
    const sorted_annos = [].concat(this.state.annos).sort((a, b) => a.id > b.id ? 1 : -1);

    return (
      <div
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{
          __html: sorted_annos[cellInfo.index][cellInfo.column.id]
        }}
        onBlur={e => {
          let labelValue = e.target.innerHTML;
          let filtered = this.state.annos.filter( (el) => {
            return el.id === cellInfo.original.id
          })[0]
          filtered[cellInfo.column.id] = labelValue
          this.props.updateSelectedAnno(filtered)
        }
        }      />
    );
  };

  render(){
    // console.log("Available annos", this.props.annos);
    const columns = [{
      Header: 'Label Name',
      accessor: 'id',
      Cell: this.selectLabel
    },{
      Header: 'Label Value',
      accessor: 'labelValue',
      Cell: this.renderEditableCell
    }]

    const sorted_annos = [].concat(this.state.annos).sort((a, b) => a.id > b.id ? 1 : -1);
    const l_left = this.props.svg.left + this.props.svg.width + 10
    if(this.props.annos && this.props.annos.length > 0) {
      return (
        <div
          style={{position: 'fixed', top: this.props.svg.top, left: l_left, width: 250}}
        >
          <ReactTable
            data={sorted_annos}
            columns={columns}
            pageSize={this.props.annos.length}
            className='-striped -highlight'
            showPagination = {false}
            NoDataComponent={() => null}
            getTrProps={this.onLabelROITableRowClick}
          />
        </div>
      )
    }else{
      return null;
    }
  }
}

export default ROITable
