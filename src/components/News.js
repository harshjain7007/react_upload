import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'  // for class based components me props ko use karne ke liye 
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {


     //  its a static variable wich means its used for like requirment and set variable for  "by defaulte" 
     static defaultProps = { // by defaulte
          country: 'in',
          pageSize: 8,
          category: 'general'
     }
     static propTypes = {  // require 
          country: PropTypes.string,
          pageSize: PropTypes.number,
          category: PropTypes.string
     }



     // articles = [  //variable
     //      {
     //           "source": {
     //           "id": "bbc-sport",
     //           "name": "BBC Sport"
     //           },
     //           "author": "BBC Sport",
     //           "title": "Shane Warne memorial - watch & follow updates",
     //           "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
     //           "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
     //           "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
     //           "publishedAt": "2022-03-30T08:22:26.498888Z",
     //           "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
     //           },
     //           {
     //           "source": {
     //           "id": "espn-cric-info",
     //           "name": "ESPN Cric Info"
     //           },
     //           "author": null,
     //           "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
     //           "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
     //           "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
     //           "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
     //           "publishedAt": "2020-04-27T11:41:47Z",
     //           "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
     //           },
     //           {
     //           "source": {
     //           "id": "espn-cric-info",
     //           "name": "ESPN Cric Info"
     //           },
     //           "author": null,
     //           "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
     //           "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
     //           "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
     //           "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
     //           "publishedAt": "2020-03-30T15:26:05Z",
     //           "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
     //           }
     // ]


     capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
     }


     constructor(props) {  //  useful for set state
          super(props) // // its a constructor { constructor tab run kerta hai jab v is class ka koi objecct bnta hai }

          console.log("hello i am constructor form news components")
          this.state = { // this.props karke v state set ker sakte hai || props chng ni ker sakte , state ko chng ker sakte ho  
               articles: [],
               loading: false,
               page: 1,
               totalResults: 0
          }
          document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`   // for adding title category wisee
     }



     // which is run after render method  || api se data lake state ko update kerna 
     async componentDidMount() {
          this.update()
          //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da3e25398ccd4fa59afaaf49a15879c8&page=1&pagesize=${this.props.pageSize}`

          // this.setState({loading: true}) // for spinner
          //  let data = await fetch(url)   
          // //  console.log(data)        
          //  let parsedData = await data.json()
          //  console.log(parsedData)
          //  this.setState({ articles: parsedData.articles, 
          //      totalResults: parsedData.totalResults ,
          // loading: false }) //for updating  state
     }

     async update() {

          this.props.setProgress(20);  // for top loading bar
          const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`

          this.setState({ loading: true }) // for spinner
          let data = await fetch(url)
          this.props.setProgress(40);
          //  console.log(data)        
          let parsedData = await data.json()
          this.props.setProgress(70);
          console.log(parsedData)
          this.setState({
               articles: parsedData.articles,
               totalResults: parsedData.totalResults,
               loading: false
          }) //for updating  state
          this.props.setProgress(100);
     }

     privious = async () => {
          console.log("pre")
          //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da3e25398ccd4fa59afaaf49a15879c8&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`

          //  this.setState({loading: true}) // for spinner
          //  let data = await fetch(url)   
          // //  console.log(data)        
          //  let parsedData = await data.json()
          // this.setState({
          //      page : this.state.page - 1,
          //      articles :  parsedData.articles,
          //      loading: false
          // })
          this.setState({ page: this.state.page - 1 })
          this.update()

     }
     next = async () => {
          console.log("next")
          //           if(!( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
          // console.log("chl") // condition for next button run ni karega if page ni honge toh
          //           let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=da3e25398ccd4fa59afaaf49a15879c8&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`

          //           this.setState({loading: true}) // for spinner
          //            let data = await fetch(url)   
          //           //  console.log(data)        
          //            let parsedData = await data.json()
          //           this.setState({
          //                page : this.state.page + 1,
          //                articles :  parsedData.articles,
          //                loading: false
          //           })
          //      }
          this.setState({ page: this.state.page + 1 })
          this.update()
     }

     // fetch more functon for infinity scroll
     fetchMoreData = async () => {

          this.setState({ page: this.state.page + 1 })
          const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`

          // this.setState({ loading: true }) // for spinner
          let data = await fetch(url)
          //  console.log(data)        
          let parsedData = await data.json()
          console.log(parsedData)
          this.setState({
               articles: this.state.articles.concat(parsedData.articles),
               totalResults: parsedData.totalResults
          }) //for updating  state


     };

     render() {
          console.log("render")
          return (
               // <div className='container my-3'>
               <>
                    <h2 className='my-4 text-center'>News Monkey - Top Headings form {`${this.capitalizeFirstLetter(this.props.category)}`} category</h2>
                    {/* {this.state.article.map((element) => {console.log(element)})}  
                    this.state ka data constructor se aa rha hai  */}

                    {/* // for  1step for infinite scroll */}
                    <InfiniteScroll
                         dataLength={this.state.articles.length}
                         next={this.fetchMoreData}
                         hasMore={this.state.articles.length !== this.state.totalResults}
                         loader={<Spinner />}
                    >

                         <div className="container">
                              <div className="row">
                                   {this.state.articles.map((element) => {
                                        return <div className="col-md-4 my-3" key={element.url} >
                                             {/* key={element.url}  unique key prop dena padhta hai  */}
                                             <Newsitem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 103) : ""} imageUrl={element.urlToImage} newsUrl={element.url}
                                                  author={element.author} date={element.publishedAt} source={element.source.name} />
                                        </div>
                                   })}
                              </div>
                         </div>
                    </InfiniteScroll>
                    {this.state.loading && <Spinner />}

                    {/* <div className="container " style={{ display: "flex", justifyContent: "space-between" }}>
                         <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.privious} >&larr; Previous</button> 
                         <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.next}>Next &rarr;</button>
                    </div> */}
                {/* </div> */}
                </>
          )
     }
}

export default News
