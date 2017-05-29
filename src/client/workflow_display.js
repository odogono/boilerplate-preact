import _ from 'underscore';
import {h, render, Component} from 'preact';
import getNodeDimensions from 'get-node-dimensions';

require('./main.scss')

class Circle extends Component {
    render() {
        return <circle {...this.props}>{this.props.children}</circle>;
    }
}

class SVGRect extends Component {
    render(){
        return <rect {...this.props}>{this.props.children}</rect>;
    }
}

export default class WorkflowDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: _.isUndefined(props.total) ? 0 : props.total,
            count: _.isUndefined(props.count) ? 0 : props.count,
            element:null,
            dimensions: {width:-1, height:-1},
            width: props.width || '100%',
            height: props.height || '100%',
        }
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentDidMount() {
        this.remeasure();
        window.addEventListener('resize', this.remeasure);
    }

    componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener('resize', this.remeasure);
    }


    render() {
        const inc = this.state.dimensions.width / (this.props.total+1);
        const points = _.map( _.range(this.props.total), i => (i+1) * inc );
        const py = this.state.dimensions.height / 2;

        let connects = null;
        let diamonds = null;

        if( this.state.dimensions.width > 0 ){
            
            diamonds = _.map(points, (px,i) => {
                const params = {
                    x: -25, y: -25,
                    width: 50, height: 50,
                    style: (i < this.props.count) ? `stroke-width: 5px; stroke: #000; fill: #FFF` : `stroke-width: 5px; fill:#000;`,
                    transform: `rotate(45 ${px} ${py}) translate(${px} ${py})` 
                };
                return <SVGRect {...params} />
            });

            connects = _.map(points, (px,i) => {
                if( i == (this.props.total-1) ){ return; }
                const height = 7.5;
                const params = {
                    x: px, 
                    y: py-(height/2),
                    width: inc,
                    height,
                    style: `fill: #222222`
                };
                return <SVGRect {...params} />
            });
        }


        return <svg ref={(elem)=>{ this.state.element = elem;}} {...this.state}>
                {connects}
                {diamonds}
                {this.props.children}
            </svg>;
    }


    remeasure = _.throttle( () => {
        if (!this.mounted || !this.state.element) {
            return;
        }

        const dimensions = getNodeDimensions(this.state.element);
        this.setState({dimensions})
    }, 500);
}



export class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        // const svg = this.refs.money.getDOMNode();
        // console.log('[MainContainer] ref', svg);
    }

    render(props,state){
        return  <div className="main">
            <div className="section" style="flex: 0.5; background-color:red;"></div>
            
            <div className="section" style="flex: 2; background-color:green;">
                <WorkflowDisplay total={4} count={1} />
            </div>
            <div className="section" style="flex: 0.5; background-color:blue;"></div>
        </div>
    }
}
