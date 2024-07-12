import { Group, Button, Text, Anchor } from "@mantine/core";

export function Footer() {
  return (
    <Group justify="center" p="md">
      <Text>
        Developed by{" "}
        <Anchor
          href="https://github.com/abhishek0shakya/"
          style={{ color: "#3457D5", fontWeight: "600" }}
          target="_blank"
        >
          Abhishek Shakya
        </Anchor>
      </Text>
      <img
        src="/heart.gif"
        alt="Heart GIF"
        style={{ width: "25px", height: "auto", marginLeft: "-12px" }}
      />
    </Group>
  );
}
