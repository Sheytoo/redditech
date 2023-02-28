import PostComponent, { IPost } from "./PostComponent";
import { FlatList, RefreshControl, View } from "react-native";
import { useCallback, useState } from "react";

interface IListPostProps {
  posts: IPost[];
}

const ListPost = (props: IListPostProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  return (
    <FlatList
      style={{ marginTop: 20, marginHorizontal: 20 }}
      data={props.posts}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
      renderItem={({ item }) => (
        <PostComponent post={item}/>
      )}
    />
  );
};

export default ListPost;
