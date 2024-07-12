import { Avatar, Text, Button, Paper } from "@mantine/core";

export function UserInfoIcons() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "100px",
      }}
    >
      <Paper
        radius="md"
        withBorder
        p="lg"
        bg="var(--mantine-color-body)"
        style={{
          maxWidth: "600px",
        }}
      >
        <div
          style={{
            marginRight: "70px",
            marginLeft: "70px",
            marginBottom: "10px",
            marginTop: "10px",
            "@media (maxWidth : 600px)": {
              margin: "0",
            },
          }}
        >
          <Avatar src="/abhi.jpg" size={120} radius={120} mx="auto" />
          <Text
            ta="center"
            fz="lg"
            fw={500}
            mt="md"
            style={{ color: "#3457D5" }}
          >
            Abhishek Shakya
          </Text>
          <Text ta="center" c="dimmed" fz="sm">
            • React Developer<br></br> abhishekshakya12910@gmail.com
          </Text>

          <Button
            component="a"
            href="https://www.instagram.com/shorts_writer/"
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            mt="md"
            sx={{
              "&:hover": {
                backgroundColor: "#3457D5",
                color: "#fff", // Optional: change text color on hover
              },
            }}
          >
            Send message
          </Button>
        </div>
      </Paper>
    </div>
  );
}
