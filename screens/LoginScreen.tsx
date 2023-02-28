import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "../assets/logo.png";
import { themes } from "../themes";
import { useEffect, useState } from "react";
import { makeRedirectUri, ResponseType, useAuthRequest } from "expo-auth-session";
import { CLIENT_ID } from "@env";
import { save } from "../secureStore";
import base64 from "react-native-base64";

interface ILoginScreenProps {
  onLogin: () => void;
}

const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

const LoginScreen = (props: ILoginScreenProps) => {
  const [buttonOpacity, setButtonOpacity] = useState(0);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: CLIENT_ID,
      scopes: [
        'identity', 'edit', 'subscribe', 'save', 'submit', 'read',
        'modconfig', 'account', 'vote', 'flair', 'mysubreddits'
      ],
      redirectUri: makeRedirectUri({
        scheme: 'exp'
      }),
    },
    discovery
  );

  const getAccessToken = async (code: string) => {
    const formData = new FormData();
    formData.append("grant_type", "authorization_code");
    formData.append("code", code);
    formData.append("redirect_uri", makeRedirectUri({
      scheme: "exp"
    }));
    const response = await fetch(discovery.tokenEndpoint, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${base64.encode(`${CLIENT_ID}:`)}`
      },
      body: formData
    });
    const data = await response.json();
    await save("token", data.access_token);
  }

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      getAccessToken(code).then(() => props.onLogin());
    }
  }, [response]);

  setTimeout(() => {
    setButtonOpacity(1);
  }, 500);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        resizeMethod={"resize"}
        resizeMode={"contain"}
        style={{ width: 250, height: 250 }}/>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => promptAsync()}
        style={[styles.button, { opacity: buttonOpacity }]}>
        <Text style={styles.buttonText}>
          Login with Reddit
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.colors.secondary,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginTop: 15,
  },
  buttonText: {
    color: themes.colors.secondary,
    fontSize: 16,
    fontWeight: "400",
  }
});

export default LoginScreen;
