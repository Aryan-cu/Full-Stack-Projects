import "./App.css";
import { useState } from "react";
function App() {
  const [post,setPost]=useState("");
  const [platform,setPlatform]=useState("Twitter");
  const [error,setError]=useState("");
  const maxChars={Twitter:280,Facebook:63206,Instagram:2200};
  const handlePostChange=(e)=>{
    const text=e.target.value;
    const limit=maxChars[platform];
    if(text.length<=limit){
      setPost(text);
      setError("");
    }else{
      setError(`❌ Maximum ${limit} characters allowed for ${platform}!`);
    }
  };
  const handlePlatformChange=(e)=>{
    const newPlatform=e.target.value;
    setPlatform(newPlatform);
    setError("");
    const limit=maxChars[newPlatform];
    if(post.length>limit){
      setError(`⚠️ Your post has ${post.length} characters. ${newPlatform} allows only ${limit}!`);
    }
  };
  const handlePublish=()=>{
    if(post.trim().length===0){
      setError("Please write something before publishing!");
      return;
    }
    if(post.length>maxChars[platform]){
      setError(`Too many characters for ${platform}! Maximum is ${maxChars[platform]}.`);
      return;
    }
    alert(`✅ Post published on ${platform}!\n\n📝 ${post}`);
    setPost("");
    setError("");
  };
  return(
    <div className="container">
      <h1>📱 Social Media Post Composer</h1>
      <label>Select Platform</label>
      <br/><br/>
      <select value={platform} onChange={handlePlatformChange}>
        <option>Twitter</option>
        <option>Facebook</option>
        <option>Instagram</option>
      </select>
      <br/><br/>
      <label>Write Your Post</label>
      <br/><br/>
      <textarea rows="8" cols="60" placeholder={`Write your post here... (Max ${maxChars[platform]} chars)`} value={post} onChange={handlePostChange}></textarea>
      <br/>
      <div style={{fontSize:"14px",color:post.length>maxChars[platform]?"red":"green",fontWeight:"bold"}}>📊 {post.length}/{maxChars[platform]} characters</div>
      {error&&(<div style={{color:"red",marginTop:"10px",padding:"10px",backgroundColor:"#ffe6e6",borderRadius:"5px",fontWeight:"bold"}}>{error}</div>)}
      <br/><br/>
      <button onClick={handlePublish}>🚀 Publish</button>
    </div>
  );
}
export default App;