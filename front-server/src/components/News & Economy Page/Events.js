import React from 'react';
import { Dropdown, Form, Button, Table } from 'react-bootstrap';
import styled from "styled-components";
import Card from 'react-bootstrap/Card';
import axios from '../../apis/api';
import HeadlineCard from './HeadlineCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactCardFlip from 'react-card-flip';
import Spinner from 'react-bootstrap/Spinner'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import FormControl from 'react-bootstrap/FormControl';

//icons
import i1 from '../../icons/headline icons/i1.png'
import i2 from '../../icons/headline icons/i2.png'
import i3 from '../../icons/headline icons/i4.png'
import i4 from '../../icons/headline icons/i4.png'
import i5 from '../../icons/headline icons/i5.png'
import i6 from '../../icons/headline icons/i6.png'
import i7 from '../../icons/headline icons/i7.png'
import i8 from '../../icons/headline icons/i8.png'
import i9 from '../../icons/headline icons/i9.png'
import i10 from '../../icons/headline icons/i10.png'
import i11 from '../../icons/headline icons/i11.png'
import i12 from '../../icons/headline icons/i12.png'
import i13 from '../../icons/headline icons/i13.png'
import i14 from '../../icons/headline icons/i14.png'
import i15 from '../../icons/headline icons/i15.png'
import space from '../../icons/headline icons/space.svg'
import emo from '../../icons/intelligence.svg'
import clock from '../../icons/square.svg'
import fil from '../../icons/tool.svg'

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'events': [],
            'headlines': [],
            'current_event': '',
            'keywords': [],
            'impactful_events': [],
            'min_volumes': [],
            'related': true,
            'current_event_id': '',
            'waiting': true,
            'waiting_events': true,
            'sentiments': [],
            'p_change': [],
            series: [{
                name: "DJI",
                data: []
            },
            {
                name: "GSPC",
                data: []
            },
            {
                name: "IXIC",
                data: []
            },
            {
                name: "RUT",
                data: []
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [],
                }
            }
        };

        this.getEconomicEvents();
        this.getMinVolumes();
    }

    rand(max) {
        return Math.floor(Math.random() * max)
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    async getPchange(start_date, end_date) {
        const self = this;
        axios.get('/p_change?start_date=' + start_date + '&end_date=' + end_date)
            .then(function (response) {
                const data = response.data.data;
                var rows = []
                for (var i = 0; i < data.length; i++) {
                    const row = data[i];
                    rows.push(
                        <tr key={i}>
                            <td>{row.symbol}</td>
                            <td>{row.p_change}</td>
                        </tr>
                    );
                }
                self.setState({
                    'p_change': rows
                });
                self.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async getClosingPrices(start_date, end_date) {
        const self = this;
        axios.get('/all_closings?start_date=' + start_date + '&end_date=' + end_date)
            .then(function (response) {
                var dates = [];
                var dji = [];
                var gspc = [];
                var ixic = [];
                var rut = [];
                var data = response.data.data;

                for (var i = 0; i < data.length; i++) {
                    const item = data[i];
                    dates.push(item.date.slice(0, -13));
                    if (item.index_symbol === 'DJI') {
                        dji.push(item.close);
                    }
                    else if (item.index_symbol === 'GSPC') {
                        gspc.push(item.close);
                    }
                    else if (item.index_symbol === 'IXIC') {
                        ixic.push(item.close);
                    }
                    else if (item.index_symbol === 'RUT') {
                        rut.push(item.close);
                    }
                }

                self.setState({
                    series: [{
                        name: "DJI",
                        data: dji
                    },
                    {
                        name: "GSPC",
                        data: gspc
                    },
                    {
                        name: "IXIC",
                        data: ixic
                    },
                    {
                        name: "RUT",
                        data: rut
                    }],
                    options: {
                        chart: {
                            height: 350,
                            type: 'line',
                            zoom: {
                                enabled: false
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'straight'
                        },
                        grid: {
                            row: {
                                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                                opacity: 0.5
                            },
                        },
                        xaxis: {
                            categories: dates,
                        }
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    async getMinVolumes() {
        const self = this;
        axios.get('/min_volumes')
            .then(function (response) {
                self.setState({
                    'min_volumes': response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async getEconomicEvents() {
        const self = this;
        axios.get('/scan_event')
            .then(function (response) {
                var events = [];
                for (var i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    events.push(item);
                }

                self.setState({
                    'events': events,
                    'waiting_events': false
                });
                // self.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async getEvent(event) {
        const self = this;
        this.setState({waiting: true})
        axios.get('/event_headlines?event_id=' + event)
            .then(function (response) {
                var headlines = [];
                var dates = [];
                for (var i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    headlines.push(item);
                    dates.push(new Date(item.date));
                }
                self.setState({
                    'headlines': headlines,
                    'waiting': false
                });
                self.setState({waiting: false})
                const maxDate = self.formatDate(new Date(Math.max.apply(null, dates)));
                const minDate = self.formatDate(new Date(Math.min.apply(null, dates)));
                self.getPchange(minDate, maxDate);
                self.getClosingPrices(minDate, maxDate);
            })
            .catch(function (error) {
                console.log(error);
            });

        this.getKeywords(event);
    }

    async getKeywords(id) {
        const self = this;
        axios.get('/keywords?event_id=' + id)
            .then(function (response) {
                self.setState({
                    'keywords': response.data.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    count(sentence, word) {
        sentence += '';
        word += '';

        if (word.length <= 0) {
            return sentence.length + 1;
        }

        word = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return (sentence.match(new RegExp(word, 'gi')) || []).length;
    }

    getImpactScore() {
        var score = 0;
        for (var i = 0; i < this.props.keywords.length; i++) {
            const keyword = this.props.keywords[i];
            score += this.count(this.props.headline, keyword);
        }
        this.setState({
            score: score
        });
    }

    async getImpactfulEvents(threshold) {
        const self = this;
        this.setState({'waiting_events': true})
        console.log("ENTERED")
        axios.get('/impactful_events?threshold=' + threshold)
            .then(function (response) {
                const events = response.data.data;
                console.log(events)
                self.setState({
                    'events': events,
                    'waiting_events': false,
                    'current_event_id': ''
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getStatColor = () => {
        if (this.state.related){
            return 
        } else {
            return 'white'
        }     
    }

    getStatBackColor = () => {
        if (!this.state.related){
            return '#9b59b6'
        } else {
            return 'ffffff'
        }     
    }
   
    getRelColor = () => {
        if (this.state.related){
            return 'white'
        } else {
            return 
        }     
    }

    getRelBackColor = () => {
        if (this.state.related){
            return '#2ed573'
        } else {
            return 'ffffff'
        }     
    }

    getRelBorderColor = () => {
        if (this.state.related){
            return ''
        } else {
            return '#DBDCE0'
        }     
    }


    getStatBorderColor = () => {
        if (!this.state.related){
            return ''
        } else {
            return '#DBDCE0'
        }     
    }

    getAverageSentiment() {
        return(
            <h3>Average Sentiment: {(this.state.sentiments.reduce((a, b) => a + b, 0) / this.state.sentiments.length).toFixed(2)}</h3>
        )
    }


   

    processEventSelection = (id) => {
        if (!(this.state.current_event_id === id)) {
            this.getEvent(id)
            this.setState({current_event_id: id})
        }
    }

    renderSelection(id) {
        if (this.state.current_event_id === id) {
            return "2px solid #1e90ff";
        } else {
            return "1.4px solid #DBDCE0";
        }
    }

    renderEvents() {
        if (!this.state.waiting_events) {
            return this.state.events.map((event) => {
                return (
                    <EconomicCard bor = {this.renderSelection(event.id)} key = {event.id}  onClick={() => this.processEventSelection(event.id)}>
                        {event.name}
                    </EconomicCard>
                )
            })
        } else {
            return(
                <>
                    <StyledSpinner animation="border" />
                </>
            )
            
        }
    }


    
    renderHeadlines() {
        if (this.state.waiting){
            return(
                <>
                    <StyledSpinner2 animation="border" />
                </>
            )
        } else {
            const icons = [i1, i2, i3, i4, i12, i5, i6, i12, i12, i7, i12, i8, i9, i10, i12, i11, i12, i13, i14, i15];
            let sentiments = []
            let newslines = this.state.headlines.map((headline, i) => {
                var score = 0;
                if (this.state.keywords[i]) {
                    for (var j = 0; j < this.state.keywords[i].length; j++) {
                        const word = this.state.keywords[i][j];
                        score += this.count(headline.headline, word);
                        
                    }
                }
                sentiments.push(headline.sentiment_score)
                return (
                    <NewsItem icon = {icons[this.rand(icons.length)]} text = {headline.headline} sentiment = {headline.sentiment_score} impact = {score} date = {headline.date}/>
                )
            })
            this.setState({sentiments: sentiments})
            return newslines
        }
    }
    
    onSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const threshold = form.elements.threshold.value;
        this.getImpactfulEvents(threshold);
    }
    

    renderFilter(){
        return(
            <>
            <OverlayTrigger
                                    
                trigger = 'click'
                placement={'bottom'}
                overlay={
                <StyledPopover display = {this.state.display} id={`popover-positioned-bottom`}>
                    <StyledPopoverContent>
                        <Form onSubmit={(e) => this.onSubmit(e)}>
                            <Form.Group controlId="threshold">
                                <Form.Label >Assoc. With Sentiment Score</Form.Label>
                                <Form.Control type="text" placeholder="Enter Threshold" />
                            </Form.Group>
                            <SubmitButton type="submit">Submit</SubmitButton>
                        </Form>
                    </StyledPopoverContent>
                </StyledPopover>
                }
            >
                <FilterButton onClick = {() => this.setState({display: ''})} ><StyledImg3 src = {fil}/></FilterButton>
            </OverlayTrigger>{' '}
            </>
        )
    }

    renderStatline() {
        let sent = this.getAverageSentiment()
        let table = (
            <>
            <h3>Index Performance During Event</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Index Symbol</th>
                        <th>% Change</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.p_change}
                </tbody>
            </Table></>)
        
    }
    
    render() {
        return (
            <Back>
                <Wrapper>
                        
                        <CardView>
                            {this.renderFilter()}
                            {this.renderEvents()}
                        </CardView>
                    <RelatedView>
                        <RelatedOptions>
                            
                            <RelatedOption hov ='#2ed573' bor = {this.getRelBorderColor} color = {this.getRelColor} b = {this.getRelBackColor} onClick = {() => this.setState({related: true})}>Related News</RelatedOption>
                            <RelatedOption hov = '#9b59b6' bor = {this.getStatBorderColor} color = {this.getStatColor} b = {this.getStatBackColor} onClick = {() => this.setState({related: false})} >Statistics</RelatedOption>
                        </RelatedOptions>
                        <HeadlineView>
                            {this.renderStatline()}
                            {this.renderHeadlines()}
                        </HeadlineView>
                    </RelatedView>
                </Wrapper>
            </Back>
        );
    }
}

class NewsItem extends React.Component {
    constructor() {
        super();
        
        this.state = {
            isFlipped: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }
     
    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    rand(max) {
        return Math.floor(Math.random() * max)
    }

    renderText() {
        let headline = this.props.text
        let left = 30
        let bool = false
        if (headline.substring(0, 1) === 'b'){
            headline = headline.substring(1, headline.length)
        }
        while (headline.length > 110){
            headline = headline.split(' ').slice(0,left).join(' ');
            left -= 10;
            bool = true
        }
        if (bool) {
            headline = headline + '...'
        }
        return headline
    }
    
    renderDate() {
        let splits = this.props.date.split(' ')
        return(splits[1] + " " + splits[2] + " " + splits[3])
    }
    render() {
        

    return(
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
            <>
            <HeadCard   onClick={this.handleClick}>
                <StyledImg src = {this.props.icon} />
                <StyledHeadText>{this.renderText()}</StyledHeadText>
            </HeadCard>
            </>
            <>
                <HeadCard onClick={this.handleClick}>
                    <StyledImg2 src = {clock}/>
                    <StyledStatText color = "#9b59b6">{this.renderDate()}</StyledStatText>
                    <StyledImg2 src = {emo}/>
                    <StyledStatText color = "#3498db">{this.props.sentiment}</StyledStatText>
                    <StyledImg2 src = {space}/>
                    <StyledStatText color = "#e74c3c">{this.props.impact}</StyledStatText>
                </HeadCard>
            </>
        </ReactCardFlip>
        
    )
    }
}

const StyledPopover = styled(Popover)`
    display: ${props => props.display};
`

const StyledPopoverContent = styled(Popover.Content)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const FilterButton = styled(Button)`
    border: 1px solid ${props => props.bor};
    height:35px;
    border-radius: 0.5rem;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.8rem !important;
    display: flex;
    align-items: center;
    background-color: ${props => props.b};
    color: ${props => props.color};

    margin-left: 20px;
    &:hover {
        background-color: ${props => props.hov};
        color: white;
        cursor: pointer;
    }

    border: 0.5px solid #313896;
    background-color: white;
    &:hover {
        cursor: pointer;
        box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
        background-color: #313896;
        color: white
        border: 0.5px solid #313896 !important;
    }
`

const SubmitButton = styled(Button)`
    height: 50px !important;
    width: 100px !important;
    border: 0.5px solid #313896;
    margin-left: 50px;
    color: #313896;
    background-color: white;
    &:hover {
        cursor: pointer;
        box-shadow: 5px 12px 20px rgba(36, 37, 38, 0.13);
        background-color: #313896;
        color: white
        border: 0.5px solid #313896 !important;
    }
`

const StyledSpinner = styled(Spinner)`
    width: 200px;
    height: 200px;
    margin-top: 220px;
    margin-left: 220px;
    align-self: center;
    color: #1e90ff;
    font-size: 5rem;
`

const StyledSpinner2 = styled(Spinner)`
    width: 150px;
    height: 150px;
    margin-top: 220px;
    margin-left: 230px;
    align-self: center;
    color: #ff4757;
    font-size: 5rem;
`


const HeadlineView = styled.div`
    overflow-y: scroll !important;
    height: 650px;
    border-top: #E0E0E0 1px solid;
`

const RelatedOptions = styled.div`
    height: 50px;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const RelatedOption = styled.div`
    border: 1px solid ${props => props.bor};
    height:30px;
    border-radius: 0.5rem;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 0.8rem !important;
    display: flex;
    align-items: center;
    background-color: ${props => props.b};
    color: ${props => props.color};
    
    
    margin-right: 15px;
    &:hover {
        background-color: ${props => props.hov};
        color: white;
        cursor: pointer;
    }
`

const StyledImg = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 30px;
`

const StyledImg2 = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 15px;
`

const StyledImg3 = styled.img`
    width: 20px;
    height: 20px;
`

const Back = styled.div`
    background-color: #f6f6f6;
    padding-top: 130px;
    height:100%;
    padding-bottom: 100px;
`
const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 1300px;
    height: 720px;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 18px;
    padding-bottom: 1px;
    background-color: white;
    display: flex;
    border-radius: 1rem !important;
    box-shadow: 0 0 4px 1px rgba(0,0,0,.05), 2px 2px 2px 1px rgba(0,0,0,.05) !important;

`

const EconomicCard = styled.div`
    width: 630px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;

    padding-left: 15px;
    padding-right: 10px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5rem;
    border: ${props => props.bor};
    &:hover {
        background-color: #F7F7F7;
        cursor: pointer;
    }
`
//border-bottom: #E0E0E0 1px solid;

const HeadCard = styled.div`
    width: 600px;
    border-bottom: #E0E0E0 1px solid;
    padding-left: 15px;
    padding-right: 10px;
    height: 90px;
    display: flex;
    align-items: center;
    &:hover {
        background-color: #F7F7F7;
        cursor: pointer;
    }
`

const CardView = styled.div`
    width: 700px;  
    background-color: white;
    padding-top: 10px;
    padding-bottom: 20px;
    overflow-y: scroll !important;
    border-right: #E0E0E0 1px solid;
`


const RelatedView = styled.div`
    width: 600px;
    background-color: white;
    
`

const StyledHeadText = styled.div`
    width: 450px;
`

const StyledStatText= styled.div`
    color: ${props => props.color};
    font-size: 1.5rem !important;
    font-weight: bold;
    margin-right: 40px;
`


const Background = styled.div`
    padding-top: 150px;
    // height: 100%;
    width: 100%;
`

const CardWrapper = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 1200px;
`
//<h3>Average Sentiment: {(sentiments.reduce((a, b) => a + b, 0) / sentiments.length).toFixed(2)}</h3><br />
const StyledCard = styled(Card)`
    
    margin-bottom: 30px;
    margin-left: 6vw;
    
    width: 35vw;
    // height: 100vh;
    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);
    border-radius: 16px !important;
    border: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
    font-family: 'Roboto', sans-serif;
`

export default Events;

/*
var event_items = [];
        var headlines = [];
        var sentiments = [];
        var scores = [];
        var events_table = [];
        var volume_table = [];
        for (var i = 0; i < this.state.events.length; i++) {
            const event = this.state.events[i];
            const id = event.id;
            const name = event.name;
            event_items.push(
                <Dropdown.Item eventKey={id} key={i}>{name}</Dropdown.Item>
            );
        }
        for (var i = 0; i < this.state.headlines.length; i++) {
            const item = this.state.headlines[i];
            const headline = item.headline;
            const date = item.date;
            const sentiment = item.sentiment_score;
            var score = 0;
            if (this.state.keywords[i]) {
                for (var j = 0; j < this.state.keywords[i].length; j++) {
                    const word = this.state.keywords[i][j];
                    score += this.count(headline, word);
                }
            }
            headlines.push(
                <HeadlineCard key={i} headline={headline} date={date.slice(0, -13)} sentiment={sentiment} keywords={this.state.keywords[i]} impact_score={score}></HeadlineCard>
            );
            sentiments.push(sentiment);
        }
        for (var i = 0; i < this.state.impactful_events.length; i++) {
            const item = this.state.impactful_events[i];
            const event_name = item.name;
            const event_year = item.year;
            events_table.push(
                <tr key={i}>
                    <td>{event_name}</td>
                    <td>{event_year}</td>
                </tr>
            );
        }
        for (var i = 0; i < this.state.min_volumes.length; i++) {
            const item = this.state.min_volumes[i];
            const event_name = item.name;
            const vol = item.min_volume;
            volume_table.push(
                <tr key={i}>
                    <td>{event_name}</td>
                    <td>{vol}</td>
                </tr>
            );
        }

        const submitForm = (event) => {
            onSubmit={submitForm}
            event.preventDefault();
            const form = event.currentTarget;
            const threshold = form.elements.threshold.value;
            this.getImpactfulEvents(threshold);
        }
        var icons = [i1, i2, i3, i4, i12, i5, i6, i12, i12, i7, i12, i8, i9, i10, i12, i11, i12, i13, i14, i15]
        */


        /*

          <Background>
                <div className="container">
                    <div className="row">
                        <div className="col-6" style={{ position: 'absolute', left: '50px', overflowX: 'hidden', overflowY: 'scroll' }}>
                            <CardWrapper>
                                <StyledCard>
                                    <div className="row">
                                        <div className="col">
                                            <Dropdown onSelect={e => this.getEvent(e)}>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Economic Event
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {event_items}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>

                                    <br />
                                    <br />

                                    <div className="row">
                                        <div className="col" style={{ margin: '20px' }}>
                                            <h3>Most Impactful Events</h3>
                                            <Form onSubmit={submitForm}>
                                                <Form.Group controlId="threshold">
                                                    <Form.Control type="text" placeholder="Enter Sentiment Threshold (eg. 0.5)" />
                                                </Form.Group>
                                                <Button type="submit">Submit</Button>
                                            </Form> <br />
                                            {this.state.impactful_events.length != 0 &&
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Event</th>
                                                            <th>Year</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {events_table}
                                                    </tbody>
                                                </Table>
                                            }
                                        </div>
                                    </div>

                                    <br />
                                    <br />

                                    {this.state.current_event !== "" &&
                                        <div className="row">
                                            <div className="col" style={{ margin: '20px' }}>
                                                <h3>Current Event:</h3>
                                                <p>{this.state.current_event}</p>
                                                <h3>Average Sentiment: {(sentiments.reduce((a, b) => a + b, 0) / sentiments.length).toFixed(2)}</h3><br />
                                            </div>
                                        </div>}
                                </StyledCard>
                            </CardWrapper>

                            <div className="row">
                                <CardWrapper>
                                    <StyledCard>
                                        <div className="col" style={{ margin: '20px' }} >
                                            <h3>Minimum Intraday Volume During Economic Events</h3>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Event</th>
                                                        <th>Minimum Intraday Volume</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {volume_table}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </StyledCard>
                                </CardWrapper>
                            </div>

                            {this.state.current_event !== '' &&
                                <div className="row">
                                    <CardWrapper>
                                        <StyledCard>
                                            <h1>TODO: Insert Economic Graph</h1>
                                        </StyledCard>
                                    </CardWrapper>
                                </div>}
                        </div>
                        <div className="col-6" style={{ position: 'absolute', right: '50px', overflowX: 'hidden', overflowY: 'scroll' }}>
                            <CardWrapper>
                                <StyledCard>
                                    <div className="row">
                                        <div className="col">
                                            {headlines}
                                        </div>
                                    </div>
                                </StyledCard>
                            </CardWrapper>
                        </div>
                    </div>
                </div>

                */