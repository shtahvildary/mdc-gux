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
            skip:0,
            data: [],
        }
    }
    componentWillMount() {

        var limit = this.state.size;
        // var page=this.state.page++
        var skip = this.state.skip 
        var info = { limit, skip }
        var del;
        if (global.userType < 2) del = this.props.delete
        if (window.innerWidth > 768) this.setState({ isTable: true }, () => {
            info.isTable = true
        })
        else this.setState({ isTable: false }, () => {
            info.isTable = false
        })

        var { addNew, columns, showView, showEdit, disconnect,finished } = this.props
        this.setState({ addNew, columns, showView, showEdit, disconnect, del ,finished}, () => {
            this.fillComponent(info,this.props.nextPage)
            // this.props.nextPage(info)

        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data === this.state.data) return;
        var limit = this.state.size;
        var page=this.state.page++
        var skip = this.state.size * page
        var info = { limit, skip }

        var { addNew, columns, showView, showEdit, disconnect,page,finished } = newProps
        this.setState({ addNew, columns, showView, showEdit, disconnect ,finished}, () => {

            // var temp = this.state.data
            if (!newProps.data) return
            //todo: if newProps.data is not in this.state.data we shoud push data
            //CONCAT IS NOT CORRECT
            var data
            // data = temp.concat(newProps.data)
            data = newProps.data
            this.setState({ data }, () => {
                this.fillComponent(info,newProps.nextPage)
                
            })
        })
    }
    fillComponent(info,nextPage) {
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
            if(!this.state.finished)
            nextPage(info) })
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