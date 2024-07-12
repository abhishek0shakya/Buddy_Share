import {
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Lottie from "lottie-react";
import { useMediaQuery } from "@mantine/hooks";
import animationData from "/public/AnimationData.json";
import animationHero from "/public/AnimationHero.json";

export function HeroBullets() {
  const isSmallScreen = useMediaQuery("(max-width: 576px)");
  const isMediumScreen = useMediaQuery("(max-width: 768px)");

  const styles = {
    inner: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "calc(var(--mantine-spacing-xl) * 3)",
      paddingBottom: "calc(var(--mantine-spacing-xl) * 2)",
      flexDirection: isSmallScreen ? "column" : "row",
    },
    content: {
      maxWidth: isSmallScreen ? "100%" : "480px",
      marginRight: isSmallScreen ? 0 : "calc(var(--mantine-spacing-xl) * 2)",
      marginBottom: isSmallScreen ? "var(--mantine-spacing-md)" : 0,
    },
    title: {
      color:
        "light-dark(var(--mantine-color-black), var(--mantine-color-white))",
      fontFamily: "Outfit, sans-serif, var(--mantine-font-family)",
      fontSize: isSmallScreen ? "28px" : "40px",
      lineHeight: "1.3",
      fontWeight: "700",
    },
    control: {
      flex: isSmallScreen ? 1 : undefined,
    },
    image: {
      width: "100rem",
      height: "356px",
      display: isMediumScreen ? "none" : "block",
    },
    highlight: {
      position: "relative",
      backgroundColor: "var(--mantine-color-blue-light)",
      borderRadius: "var(--mantine-radius-sm)",
      padding: "3px 9px",
      color: "#3457D5",
    },
  };

  return (
    <Container size="md">
      <div style={styles.inner}>
        <div style={styles.content}>
          <Title style={styles.title}>
            Share files <span style={styles.highlight}>directly</span> from your
            device to anywhere
          </Title>
          <Text c="dimmed" mt="md">
            Easy to use, reliable, private, and secure. It’s no Buddy Share is
            the choice for storing and sharing your most important files.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>Peer-to-peer(P2P) sharing</List.Item>
            <List.Item>End-to-end encrypted</List.Item>
            <List.Item>Balance fast sharing</List.Item>
          </List>

          <Group mt={30}>
            <Button
              radius="xl"
              size="md"
              component="a"
              href="https://www.instagram.com/developer_abhi_/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.control}
            >
              Follow me
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              component="a"
              href="https://www.instagram.com/developer_abhi_/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.control}
            >
              Source code
            </Button>
          </Group>
        </div>
        {!isMediumScreen && (
          <Lottie
            animationData={animationHero}
            style={{
              ...styles.image,
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie
          animationData={animationData}
          style={{
            ...styles.image,
            width: "calc(5.5rem)",
            height: "calc(5.5rem)",
            display: "block",
          }}
        />
      </div>
    </Container>
  );
}
