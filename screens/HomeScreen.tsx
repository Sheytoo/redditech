import { ActivityIndicator, StyleSheet, View } from "react-native";
import MainHeader from "../components/MainHeader";
import CategorySelector, { Category } from "../components/CategorySelector";
import ListPost from "../components/ListPost";
import { getNewSubs } from "../api/subCalls";
import { useEffect, useState } from "react";
import { IPost } from "../components/PostComponent";

const formatTime = (time: number) => {
  const now = new Date().getTime();
  const diff = Math.floor((now - time) / 1000);

  if (diff < 60) {
    return `${diff}s`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}m`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h`;
  } else {
    return `${Math.floor(diff / 86400)}d`;
  }
};

const HomeScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>(Category.BEST);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    setLoading(true);
    const data = await getNewSubs(Category.BEST);
    setPosts(data.map((post: any) => ({
      id: post.data.id,
      subreddit: post.data.subreddit_name_prefixed,
      subredditIcon: post.data.subreddit_icon,
      username: `u/${post.data.author}`,
      datetime: formatTime(post.data.created_utc * 1000),
      upvotes: post.data.ups,
      comments: post.data.num_comments,
      content: post.data.title,
      link: `https://www.reddit.com${post.data.permalink}`
    })));
    setLoading(false);
  };

  useEffect(() => {
    getPosts().then();
  }, [category]);

  return (
    <View style={styles.container}>
      <MainHeader title={"Redditech"}/>
      <CategorySelector
        category={category}
        setCategory={setCategory}/>
      {loading && <ActivityIndicator
          style={{ marginTop: 20 }}
          size="small"
          color="#FF4500"/>}
      <ListPost posts={posts}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  }
});

export default HomeScreen;
