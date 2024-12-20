import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: 'general',

    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Hello I am a constructor from news component")
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0


        }
        document.title = `NewsMonkey - ${this.capitalize(this.props.category)}`;

    }


    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cbd0e606edb64c12a947249676dfa9a2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(50)
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cbd0e606edb64c12a947249676dfa9a2&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        //  let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults, loading : false})
        this.updateNews()
    }


    // handlePrevClick = async () => {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cbd0e606edb64c12a947249676dfa9a2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({loading:true})

    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json()
    //     //     this.setState({
    //     //         page:this.state.page - 1,
    //     //         articles: parsedData.articles,
    //     //         loading:false
    //     //  })
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews()
    // }


    // handleNextClick = async () => {
    //     //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cbd0e606edb64c12a947249676dfa9a2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`

    //     //         this.setState({loading:true})
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json()
    //     //     this.setState({
    //     //         page:this.state.page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading:false
    //     //  })
    //     //  }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews()

    // }


    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cbd0e606edb64c12a947249676dfa9a2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,

        })

    }



    render() {
        return (
            <>
                <h1 className='text-center'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row ">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>

                </InfiniteScroll>


            </>
        )
    }
}





export default News
