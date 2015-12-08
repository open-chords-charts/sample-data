import {bindActionCreators} from "redux"
import {connect} from "react-redux"

import ChartBench from "../components/ChartBench"
import {commitChart, editChart, redo, undo} from "../actions"


const mapStateToProps = (state, ownProps) => {
  const {slug} = ownProps.chart
  const chart = state.charts.find((chart1) => chart1.data.present.slug === slug)
  return {
    edited: chart.isEdited,
    undoDisabled: chart.data.past.length === 0,
    redoDisabled: chart.data.future.length === 0,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  commitChart,
  editChart,
  redo: redo(ownProps.chart.slug),
  undo: undo(ownProps.chart.slug),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ChartBench)
