import { Avatar, Group, Title } from "@mantine/core";

export function Header() {
  return (
    <Group
      justify="space-between"
      align="center"
      style={{
        height: "100%",
        padding: "0 20px", // Default padding
        maxWidth: "1100px", // Max width for content
        margin: "0 auto", // Center align content
        boxSizing: "border-box", // Ensure padding and border are included in width
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src="/icon-192.png" alt="logo" />
        <Title order={2} style={{ color: "#3457D5", marginLeft: "10px" }}>
          buddy share
        </Title>
      </div>
      <img
        src="/hi.gif"
        alt="Hi GIF"
        style={{ width: "50px", height: "auto", marginLeft: "10px" }}
      />
    </Group>
  );
}
