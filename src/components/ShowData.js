import React from 'react';
import ExpantionPanel from "./ExpantionPanel";
import SimpleTable from "./Table";
import Grid from '@material-ui/core/Grid';
import _ from "lodash";


class showData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTable: true,
            page: 0,
            size: 10,
            skip: 0,
            data: [],

        }
    }
    componentWillMount() {

        var limit = this.state.size;
        // var page=this.state.page++
        var skip = this.state.skip
        var limits = { limit, skip }
        var del;
        if (global.userType < 2) del = this.props.delete
        if (window.innerWidth > 768) this.setState({ isTable: true }, () => {
            limits.isTable = true
        })
        else this.setState({ isTable: false }, () => {
            limits.isTable = false
        })

        var { addNew, columns, showView, showEdit, disconnect, finished } = this.props
        this.setState({ addNew, columns, showView, showEdit, disconnect, del, finished }, () => {
            this.fillComponent(limits, this.props.nextPage)
            // this.props.nextPage(limits)

        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data === this.state.data) return;
        var limit = this.state.size;
        var page = this.state.page++
        var skip = this.state.size * page
        var limits = { limit, skip }
        limits.isTable = this.state.isTable

        var { addNew, columns, showView, showEdit, disconnect, page, finished } = newProps
        this.setState({ addNew, columns, showView, showEdit, disconnect, finished }, () => {
            console.log("newProps.clear", newProps.clear)
            if (newProps.clear) var data = []
            else var data = this.state.data
            console.log("data: ", data)
            if (!newProps.data) return
        
            newProps.data.map((d, i) => {
                if (this.state.isTable) var ind = data.findIndex(i => i._id === d._id)
                else var ind = data.findIndex(i => i.details._id === d._id)
                if (ind === -1) data.push(d)
                
            })
            this.setState({ data }, () => {
                this.fillComponent(limits, newProps.nextPage)
            })
        })
    }
    fillComponent(limits, nextPage) {
        var component;
        if (this.state.isTable)
            component =
                <SimpleTable
                    addNew={this.state.addNew}
                    columns={this.state.columns}
                    data={this.state.data}
                    showView={this.state.showView}
                    showEdit={this.state.showEdit}
                    disconnect={this.state.disconnect}
                    delete={this.state.del}
                />
        else
            component = <ExpantionPanel items={this.state.data} />
        this.setState({ component }, () => {
            if (!this.state.finished)
                nextPage(limits)
        })
    }
    nextPage(page) { console.log("page: ", page) }

    render() {
        return (
            <Grid >
                {this.state.component}
            </Grid>
        )
    }
}
export default showData;