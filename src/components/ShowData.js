import React from 'react';
import ExpantionPanel from "./ExpantionPanel";
import SimpleTable from "./Table";
import Grid from '@material-ui/core/Grid';
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroller"



class showData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isTable: true,
            page: 1,
            size: 100,
            skip: 0,
            data: [],
            hasMore:true,
            // totalPage:0

        }
    }
    componentWillMount() {

        var size = this.state.size;
        var page=this.state.page++
        var limits = { size, page }
        var del;
        if (global.userType < 2) del = this.props.delete
        if (window.innerWidth > 768 && !this.props.ExpantionPanel) this.setState({ isTable: true }, () => {
            limits.isTable = true
        })
        else this.setState({ isTable: false }, () => {
            limits.isTable = false
        })

        var { addNew, columns, showView, showEdit, disconnect, finished,dataLength } = this.props
        this.setState({ addNew, columns, showView, showEdit, disconnect, del, finished,dataLength }, () => {
            this.fillComponent(limits, this.props.nextPage)
            // this.props.nextPage(limits)

        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.data === this.state.data) return;
      
        var size = this.state.size;
        var page = this.state.page++
        var limits = { size, page }
        // var limits = { limit, skip }
        // if (window.innerWidth > 768) this.setState({ isTable: true }, () => {
        //     limits.isTable = true
        // })
        // else this.setState({ isTable: false }, () => {
        //     limits.isTable = false
        // })
        limits.isTable = this.state.isTable

        var { addNew, columns, showView, showEdit, disconnect, page, finished,dataLength } = newProps
        this.setState({ addNew, columns, showView, showEdit, disconnect, finished ,dataLength}, () => {
            if (newProps.clear) var data = []
            else var data = this.state.data
            console.log("newProps.data: ",newProps.data)
            if (!newProps.data) return
            
            newProps.data.map((d,i )=> {
                if (this.state.isTable) var ind = data.findIndex(i => i._id === d._id)
                else var ind = data.findIndex(i => i.details._id === d._id)
                if (ind === -1) data.push(d)
                
            })
            this.setState({ data,limits }, () => {
                this.fillComponent(limits, newProps.nextPage)
                // this.fillComponent()
            })
        })
    }
    // fillComponent(limits) {
        fillComponent(limits, nextPage) {
        var component;
        if (this.state.isTable&&!this.props.ExpantionPanel)
            component =
                <SimpleTable
                    addNew={this.state.addNew}
                    columns={this.state.columns}
                    data={this.state.data}
                    dataLength={this.state.dataLength}
                    showView={this.state.showView}
                    showEdit={this.state.showEdit}
                    disconnect={this.state.disconnect}
                    delete={this.state.del}
                />
        else
            component = <ExpantionPanel items={this.state.data} dataLength={this.state.dataLength} />
        this.setState({ component }, () => {

            if (!this.state.finished)
                this.requestNextPage(limits,nextPage)
        })
    }
    requestNextPage(page,limits,nextPage){
        console.log("page: ",page)
        console.log("finished: ",this.state.finished)

        // if(!this.props.nextPage){
            // if (page==this.state.totalPage){
            if (!this.state.finished)
{
    this.props.nextPage(this.state.limits)
          return this.setState({hasMore:false})
        }
      }

    render() {
        return (
            <Grid >
                  <InfiniteScroll
                pageStart={-1}
                loadMore={(page)=>this.requestNextPage(page)}
                hasMore={this.state.hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
              >

                {this.state.component}
              </InfiniteScroll>
            </Grid>
        )
    }
}
export default showData;