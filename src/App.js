import React from 'react';

// CSS Files
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

// Custom components
import CreatePost from './components/createPost';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      author: "Casey R Harding",
      voteCount: 0,
      posts: [{
        title: "This is a post!",
        content: "My post is pretttttttttty good. It's about my day!",
        author: "Harding, Casey Harding",
        voteCount: 0
      }]
    }
  }

  onContentChange = (e) => {
    const name = e.target.name;
    const content = e.target.value;
    this.setState({
      [name]: content
    })
  }

  postSubmit = (e) => {
    e.preventDefault();
    const posts = this.state.posts;
    const newPost = {
      author: this.state.author,
      content: this.state.content,
      title: this.state.title,
      voteCount: 0
    }
    posts.push(newPost);

    this.setState({
      posts,
      content: "",
      title: "",
    })
  }

  vote = (e, sentPost, operator) => {
    e.preventDefault();
    // const casey = [];
    //Filter, under the hood, is doing this
    // for (let i = 0; i < this.state.posts.length; i++) {
    //   if (this.state.posts[i].title !== sentPost.title) {
    //     casey.push(this.state.posts[i]);
    //   }
    // }
    const casey = this.state.posts.filter(checkPost => checkPost.title !== sentPost.title);

    switch(operator) {
      case "plus":
        sentPost.voteCount++
        break;
      case "minus":
        sentPost.voteCount--
        break;
      default:
        console.error("Something terrible occured in vote function")
    }

    this.setState({
      posts: [...casey, sentPost]
    })
  }

  render() {
    return (
      <div className="App">
        <CreatePost
          postSubmit={this.postSubmit}
          onContentChange={this.onContentChange}
          title={this.state.title}
          content={this.state.content}
        />
        {this.state.posts.map((post, key) =>
          <div key={key} className={post.voteCount >= 0 ? "post-wrapper" : "post-wrapper post-wrapper-negative"}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <p>{post.voteCount}</p>
            <button onClick={(e) => this.vote(e, post, "plus")}>Vote up!</button>
            <button onClick={(e) => this.vote(e, post, "minus")}>Vote down!</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;

//This is similar to the mapping function in render() { return() }
// for (let i = 0; i < this.state.posts.length; i++) {
//   let post = this.state.posts[i];
//   <button onClick={(e) => this.upVote(post)}
// }


// <i
//   class="fa fa-arrow-up"
//   aria-hidden="true"
//   onClick={(e) => this.upVote(e, post)}
// ></i>
// <i
//   class="fa fa-arrow-down"
//   aria-hidden="true"
//   onClick={(e) => this.downVote(e, post)}
// ></i>
