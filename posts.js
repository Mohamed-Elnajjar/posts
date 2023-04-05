const content = document.getElementById("content");
  const id_user = document.getElementById("id_user");
  const user_name = document.getElementById("user_name");
  const user_id = document.getElementById("user_id");
  const post_text = document.getElementById("post_text");
  const btn_add_post = document.getElementById("btn_add_post");
  const comment = document.getElementById("comment");
  const customer_name = document.getElementById("customer_name");
  const comment_user_id = document.getElementById("comment_user_id");
  const post_id = document.getElementById("post_id");
  const btn_add_comment = document.getElementById("btn_add_comment");
  const btn_add_user = document.getElementById("btn_add_user");
  const btn_update_user = document.getElementById("btn_update_user");
  const btn_update_post = document.getElementById("btn_update_post");
  const btn_update_comment = document.getElementById("btn_update_comment");
  
  let users = [];
  let posts = [];
  let comments = [];
  
  let counter_users = 1;
  let counter_posts = 1;
  let counter_comments = 1;
  
  
  let edit_user = null;
  let edit_post = null;
  let edit_comment = null;
  
  if(JSON.parse(localStorage.getItem("db")) == null){
    localStorage.setItem("db",JSON.stringify("db_social"));
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("posts",JSON.stringify(posts));
    localStorage.setItem("comments",JSON.stringify(comments));
    localStorage.setItem("counter_users",JSON.stringify(counter_users));
    localStorage.setItem("counter_posts",JSON.stringify(counter_posts));
    localStorage.setItem("counter_comments",JSON.stringify(counter_comments));
  }else {
    users = JSON.parse(localStorage.getItem("users"));
    posts = JSON.parse(localStorage.getItem("posts"));
    comments = JSON.parse(localStorage.getItem("comments"));
    counter_users = JSON.parse(localStorage.getItem("counter_users"));
    counter_posts = JSON.parse(localStorage.getItem("counter_posts"));
    counter_comments = JSON.parse(localStorage.getItem("counter_comments"));
  }
  
  
  let show_data = "";
  let flag_comments = true;
  let flag_posts = true;
  
  
  id_user.value = counter_users;
  
  btn_add_user.addEventListener("click",function(){
    const add_user = {
      id : counter_users++,
      name : user_name.value
    }
    
    users.push(add_user);
    social_media();
    id_user.value = counter_users;
    
    user_name.value = "";
    user_id.value = "";
    post_text.value = "";
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("counter_users",JSON.stringify(counter_users));
    
    
  });
  
  btn_add_post.addEventListener("click",function () {
    
    const add_post = {
      id : counter_posts++,
      userId : user_id.value,
      post : post_text.value
    }
    
    posts.push(add_post);
    social_media();
    id_user.value = counter_users;
    
    user_name.value = "";
    user_id.value = "";
    post_text.value = "";
    id_user.value = counter_users;
    localStorage.setItem("posts",JSON.stringify(posts));
    localStorage.setItem("counter_posts",JSON.stringify(counter_posts));

  });
  
  btn_add_comment.addEventListener("click",function () {
    const add_comment = {
      id : counter_comments++,
      postId : post_id.value,
      comment : comment.value,
      customer : customer_name.value,
      userId : comment_user_id.value
    }
    
    comments.push(add_comment);
    social_media();
    id_user.value = counter_users;
    comment.value = "";
    customer_name.value = "";
    post_id.value = "";
    comment_user_id.value = "";
    localStorage.setItem("comments",JSON.stringify(comments));
    localStorage.setItem("counter_comments",JSON.stringify(counter_comments));
  });
  
  
  function btn_edit_user(id){
    const get_user = users.find(el => {
      return el.id == id;
    });
    user_name.value = get_user.name;
    
    edit_user = get_user.id;
    btn_update_user.style.display = "inline-block";
  }
  
  function update_user(){
    const get_update_user = {
      id : edit_user,
      name : user_name.value
    }
    
    let update_user = users.map(el => {
      return el.id == edit_user ? get_update_user : {...el};
    });
    
    localStorage.setItem("users",JSON.stringify(update_user));
    users = JSON.parse(localStorage.getItem("users"));
    
    user_name.value = "";
    edit_user = null;
    btn_update_user.style.display = "none";
    social_media();
  }
  
  function btn_delete_user(id){
    let delete_user = users.filter(el => {
      return el.id != id;
    });
    
    let delete_posts = posts.filter(el => {
      return el.userId != id;
    });
    
    let delete_comments = comments.filter(el => {
      return el.userId != id;
    });
    
    localStorage.setItem("users",JSON.stringify(delete_user));
    localStorage.setItem("posts",JSON.stringify(delete_posts));
    localStorage.setItem("comments",JSON.stringify(delete_comments));
    users = JSON.parse(localStorage.getItem("users"));
    posts = JSON.parse(localStorage.getItem("posts"));
    comments = JSON.parse(localStorage.getItem("comments"));
    social_media();
    
  }
  
  
  
  function btn_edit_post(id){
    const get_post = posts.find(el => {
      return el.id == id;
    });
    user_id.value = get_post.userId;
    post_text.value = get_post.post;
    edit_post = get_post.id;
    btn_update_post.style.display = "inline-block";
  }
  
  function update_post(){
    const get_update_post = {
      id : edit_post,
      userId : user_id.value,
      post : post_text.value
    }
    
    let update_post = posts.map(el => {
      return el.id == edit_post ? get_update_post : {...el};
    });
    
    localStorage.setItem("posts",JSON.stringify(update_post));
    posts = JSON.parse(localStorage.getItem("posts"));
    
    post_text.value = "";
    user_id.value = "";
    edit_post = null;
    btn_update_post.style.display = "none";
    social_media();
  }
  
  
  function btn_delete_post(id){
    let delete_post = posts.filter(el => {
      return el.id != id;
    });
    
    
    let delete_comments = comments.filter(el => {
      return el.postId != id;
    });
    
    localStorage.setItem("posts",JSON.stringify(delete_post));
    localStorage.setItem("comments",JSON.stringify(delete_comments));
    posts = JSON.parse(localStorage.getItem("posts"));
    comments = JSON.parse(localStorage.getItem("comments"));
    social_media();
  }
  
  
  
  
  function btn_edit_comment(id){
    const get_comment = comments.find(el => {
      return el.id == id;
    });
    
    post_id.value = get_comment.postId;
    comment_user_id.value = get_comment.userId;
    customer_name.value = get_comment.customer;
    comment.value = get_comment.comment;
    edit_comment = get_comment.id;
    btn_update_comment.style.display = "inline-block";
  }
  
  function update_comment(){
    const get_update_comment = {
      id : edit_comment,
      userId : comment_user_id.value,
      postId : post_id.value,
      customer : customer_name.value,
      comment : comment.value
    }
    
    let update_comment = comments.map(el => {
      return el.id == edit_comment ? get_update_comment : {...el};
    });
    
    localStorage.setItem("comments",JSON.stringify(update_comment));
    comments = JSON.parse(localStorage.getItem("comments"));
    
    comment_user_id.value = "";
    post_id.value = "";
    customer_name.value = "";
    comment.value = "";
    edit_comment = null;
    btn_update_comment.style.display = "none";
    social_media();
  }
  
  function btn_delete_comment(id){
    let delete_comment = comments.filter(el => {
      return el.id != id;
    });
    
    
    localStorage.setItem("comments",JSON.stringify(delete_comment));
    comments = JSON.parse(localStorage.getItem("comments"));
    social_media();
  }


  function social_media(){
    show_data = "";
    for(var a=0; a < users.length; a++){
      show_data += `<h3 style="display:inline-block">user_name => ${users[a].name}</h3> & <h3 style="display:inline-block">user_id => ${users[a].id}</h3><div style="float:right;display:inline-block"><button type="button" style="margin-right:10px" onclick="btn_edit_user(${users[a].id})">edit_user</button><button type="button" onclick="btn_delete_user(${users[a].id})">delete_user</button></div>`;
      for(var b=0; b < posts.length; b++){
        if(users[a].id == posts[b].userId){
          show_data += `<br><div style='background-color: brown;color:white;padding:20px;font-size:large;'><p>post_id => ${posts[b].id}</p><p>post_${users[a].name} => ${posts[b].post}</p></div><div style="float:right;"><button type="button" style="margin-right:10px" onclick="btn_edit_post(${posts[b].id})">edit_post</button><button type="button" onclick="btn_delete_post(${posts[b].id})">delete_post</button></div>`;
          flag_posts = false;
          for(var c=0; c < comments.length; c++){
            if(posts[b].id == comments[c].postId){
              show_data += `<div style='background-color: chocolate;padding:20px;color:white;'><p>customer_name => ${comments[c].customer}</p><p>comment => ${comments[c].comment}</p></div><div style="float:right;"><button type="button" style="margin-right:10px" onclick="btn_edit_comment(${comments[c].id})">edit_comment</button><button type="button" onclick="btn_delete_comment(${comments[c].id})">delete_comment</button></div>`;
              flag_comments = false;
            }
          }
          if(flag_comments){
            show_data += "<div style='background-color:black;color:white;padding:20px'>NO COMMENTS....</div>";
          }
          flag_comments = true;
        }
      }
      if(flag_posts){
        show_data += "<div style='background-color:black;color:white;padding:20px'>NO POSTS....</div>";
      }
      
      show_data += "<br><br><hr><br>";
      flag_comments = true;
      flag_posts = true;
    }
    content.innerHTML = show_data;
  }
  social_media();