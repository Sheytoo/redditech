import React, { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bookmark, MessageSquare, MoreVertical, Share } from "react-native-feather";
import UpArrow from "../assets/up_icon.svg";
import DownArrow from "../assets/down_icon.svg";
import { themes } from "../themes";

interface IPostComponentProps {
  post: IPost;
}

export interface IPost {
  id: string;
  subreddit: string;
  subredditIcon: string;
  username: string;
  datetime: string;
  upvotes: number;
  comments: number;
  content: string;
  link: string;
}

const PostComponent = (props: IPostComponentProps) => {

  const onShare = async (url: string) => {
    try {
      await React.Share.share({
        url: url,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.infos}>
          <Image
            source={{ uri: props.post.subredditIcon }}
            style={styles.image}/>
          <View>
            <Text style={{ fontWeight: "700", marginBottom: 3 }}>
              {props.post.subreddit}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "300" }}>
              Posted by {props.post.username} • {props.post.datetime} ago
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Bookmark width={20} height={20} strokeWidth={2} color={"#C6C6C6"} style={{ marginRight: 5 }}/>
          <MoreVertical width={20} height={20} strokeWidth={2} color={"#C6C6C6"}/>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>
          {props.post.content}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={[styles.flexItem, styles.upvotes]}>
          <UpArrow width={14} height={14}/>
          <Text style={[styles.textItem, { marginRight: 5 }]}>
            {props.post.upvotes}
          </Text>
          <DownArrow width={14} height={14}/>
        </View>
        <View style={styles.flexItem}>
          <MessageSquare width={18} height={18} strokeWidth={2} color={"#C6C6C6"}/>
          <Text style={styles.textItem}>{props.post.comments}</Text>
        </View>
        <TouchableOpacity
          style={styles.flexItem}
          activeOpacity={0.6}
          onPress={() => onShare(props.post.link)}>
          <Share width={17} height={17} strokeWidth={2} color={"#C6C6C6"}/>
          <Text style={styles.textItem}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    padding: 15,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: themes.colors.secondary,
    marginRight: 10,
  },
  infos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
  },
  flexItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
  },
  textItem: {
    color: "#C6C6C6",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },
  upvotes: {
    backgroundColor: "#EEEDED",
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
  }
});

export default PostComponent;
