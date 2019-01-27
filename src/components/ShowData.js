import React from 'react';
import ExpantionPanel from "./ExpantionPanel";
import SimpleTable from "./Table";
import Grid from '@material-ui/core/Grid';


class showData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTable: true,
            page: 0,
            size: 10,
            data: [],
        }
    }
    componentWillMount() {

        var limit = this.state.size;
        var skip = this.state.size * this.state.page
        var info = { limit, skip }
        var del;
        if (global.userType < 2) del = this.props.delete
        if (window.innerWidth > 768) this.setState({ isTable: true }, () => {
            info.isTable = true
        })
        else this.setState({ isTable: false }, () => {
            info.isTable = false
        })

        this.props.nextPage(info)
        var { addNew, columns, showView, showEdit, disconnect } = this.props
        this.setState({ addNew, columns, showView, showEdit, disconnect, del }, () => {
            this.fillComponent()
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data === this.state.data) return;
        var { addNew, columns, showView, showEdit, disconnect } = newProps
        this.setState({ addNew, columns, showView, showEdit, disconnect }, () => {

            var temp = this.state.data
            if (!newProps.data) return
            //todo: if newProps.data is not in this.state.data we shoud push data
            //CONCAT IS NOT CORRECT
            var data
            // data = temp.concat(newProps.data)
            data = newProps.data
            this.setState({ data }, () => {
                this.fillComponent()
            })
        })
    }
    fillComponent() {
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
        this.setState({ component }, () => { })
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