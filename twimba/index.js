import { tweetsData } from "/data.js";
let edited = "";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let currentUse = {
  handle: `@Scrimba`,
  profilePic: `images/scrimbalogo.png`,
  likes: 0,
  retweets: 0,
  tweetText: "",
  replies: [],
  isLiked: false,
  isRetweeted: false,
  uuid: "",
};
document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.trash) {
    handleRemoveTweet(e.target.dataset.trash);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } else if (e.target.id === "replay-btn") {
    handleReplayBtnClick(e);
  } else if (e.target.dataset.replaytrash) {
    handleRemoveReply(e.target.dataset.replaytrash);
  } else if (e.target.dataset.edit) {
    editClick(e.target.dataset.edit);
  } else if (e.target.dataset.editiconreplay) {
    console.log(e.target.dataset.editiconreplay);
    editRplayClick(e.target.dataset.editiconreplay);
  }

  e.preventDefault();
});
function editClick(tweetId) {
  const tweetText = document.getElementById(`tweet-${tweetId}`);
  const editSpan = document.getElementById("edited");

  console.log(tweetText);
  let tweets = getTweets();
  const targetTweetObj = tweets.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  console.log(targetTweetObj);

  console.log(tweetText);

  targetTweetObj.tweetText = prompt("Edit your tweet!");
  targetTweetObj.tweetText += `(edited)`;

  localStorage.setItem("tweetsData", JSON.stringify(tweets));

  render();
}
function editRplayClick(replayId) {
  let tweets = getTweets();
  let editText = prompt("Edit your comment!");
  tweets.forEach((tweet) => {
    tweet.replies = tweet.replies.filter(function (curr) {
      if (curr.uuid == replayId) {
        curr.tweetText = editText;
        localStorage.setItem("tweetsData", JSON.stringify(tweets));
      }
    });
  });

  render();
}

function handleRemoveReply(replyId) {
  let tweets = getTweets();
  let confirmz = confirm("Do you want to delete your comment permanently?");
  if (confirmz) {
    tweets.forEach((tweet) => {
      tweet.replies = tweet.replies.filter((cur) => cur.uuid != replyId);
      console.log({ replyId: replyId, replies: tweet.replies });
    });

    localStorage.setItem("tweetsData", JSON.stringify(tweets));

    render();
  }
}

function handleReplayBtnClick(e) {
  let tweets = getTweets();
  let replyId = e.target.dataset.replay;
  let replayinput = document.getElementById(`myReplays-${replyId}`);

  if (replayinput.value) {
    const targetTweetObj = tweets.filter(function (tweet) {
      return tweet.uuid === replyId;
    })[0];

    let newReplay = {
      handle: `${currentUse.handle}`,
      profilePic: `${currentUse.profilePic}`,
      tweetText: `${replayinput.value}`,
      uuid: uuidv4(),
    };
    // replyRemoveId.push(newReplay);

    targetTweetObj.replies.push(newReplay);

    localStorage.setItem("tweetsData", JSON.stringify(tweets));
    replayinput.value = "";

    render();
  }
}
function handleLikeClick(tweetId) {
  let tweets = getTweets();

  const targetTweetObj = tweets.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  localStorage.setItem("tweetsData", JSON.stringify(tweets));
  render();
}

function handleRetweetClick(tweetId) {
  let tweets = getTweets();

  const targetTweetObj = tweets.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  localStorage.setItem("tweetsData", JSON.stringify(tweets));

  render();
}

function handleRemoveTweet(tweetId) {
  let tweets = getTweets();

  for (let i = tweets.length - 1; i >= 0; --i) {
    if (tweets[i].uuid == tweetId) {
      let confirmationDel = confirm(
        "Do you want to delete your twwet permanently?"
      );
      if (confirmationDel) {
        tweets.splice(i, 1);
      }
    }
  }
  localStorage.setItem("tweetsData", JSON.stringify(tweets));

  render();
}

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");

  if (tweetInput.value) {
    currentUse.tweetText = tweetInput.value;
    currentUse.uuid = uuidv4();
    storeTweet(currentUse);
    render();
    tweetInput.value = "";
  }
}

function getFeedHtml() {
  let tweets = getTweets();

  let feedHtml = ``;
  let currentUser = "";

  tweets.forEach(function (tweet) {
    currentUser = tweet.handle;
    let trashIcon = "";
    let replay = "";
    let editIcon = "";

    if (currentUser === "@Scrimba") {
      editIcon = `
        
        <span class="tweet-detail">
                    <i class="fa-regular fa-edit"
                    data-edit="${tweet.uuid}"
                    ></i>
                </span>

        `;

      trashIcon = `
        <span class="tweet-detail">
            <i class="fa-solid fa-trash trash "data-trash ="${tweet.uuid}" 
            
            ></i>
        </span>
    
        `;
    }
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";

    if (tweet.replies.length > 0) {
      let trashIconReply = "";
      let editReplayIcon = "";
      tweet.replies.forEach(function (reply, index) {
        if (tweet.replies[index].handle === "@Scrimba") {
          trashIconReply = `
              <div class="replay-trash replay-trashy">
              <span class="tweet-detail tweet-detaily">
                  <i class="fa-solid fa-trash trash "data-replaytrash ="${reply.uuid}"
                  ></i>
              </span>
              </div>
              `;
          editReplayIcon = `
              
             <div class=" replay-trashy">
                <span class="tweet-detail tweet-detaily">
                    <i class="fa-regular fa-edit"
                    data-editIconReplay="${reply.uuid}"
                    ></i>
            </span>
             
             </div>
              `;
        }
        repliesHtml += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p  class="tweet-text">${reply.tweetText}</p>

            </div>

            ${editReplayIcon}

            ${trashIconReply}


            
    </div>


</div>

`;
      });
    }

    feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">

        <div>
          <div class = "flexy">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p id="tweet-${tweet.uuid}" class="tweet-text">${tweet.tweetText} <span id="edited" class="${edited}"></span></p>
                </div>
                ${trashIcon}
            
            </div>

            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                ${editIcon}
                
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
        <div class="tweet-reply">
        <div class="tweet-inner">
                <img src="${currentUse.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${currentUse.handle}</p>
                    <textarea id="myReplays-${tweet.uuid}" class="tweet-text" placeholder="Type your comment here..."></textarea>
                    <button id="replay-btn" class="replay-btn" data-replay ="${tweet.uuid}">Reply</button>

                </div>
      
         
        </div>
     
        </dv>

    </div>   
</div>
`;
  });

  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();

function storeTweet(newTweet) {
  let tweets;
  if (localStorage.getItem("tweetsData") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweetsData"));
  }
  tweets.unshift(newTweet);
  localStorage.setItem("tweetsData", JSON.stringify(tweets));
}

function getTweets() {
  let tweets;
  if (localStorage.getItem("tweetsData") === null) {
    window.localStorage.setItem("tweetsData", JSON.stringify(tweetsData));
  } else {
    tweets = JSON.parse(localStorage.getItem("tweetsData"));
  }
  return tweets;
}
