import {
  Group,
  ActionIcon,
  Anchor,
  AppShell,
  Center,
  Stack,
  Text,
  TextInput,
  Title,
  ThemeIcon,
  Container,
  Progress,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useClipboard, useWindowEvent } from "@mantine/hooks";
import { getStorage, ref, deleteObject } from "firebase/storage";
import React, { useEffect, useMemo, useState } from "react";
import { useUploadFile } from "react-firebase-hooks/storage";
import QRCode from "react-qr-code";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { fbApp } from "@/db";
import { IconUpload, IconCheck, IconCopy } from "@tabler/icons-react";
import { generate } from "random-words";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const storage = getStorage(fbApp);
const storageRef = ref(storage);

export default function Upload() {
  const id = useMemo(() => generate({ exactly: 3, join: "-" }), []);
  useEffect(() => console.log(id), [id]);

  const [uploaded, setUploaded] = useState(false);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>

      <AppShell.Main>
        <Container size="xs">
          {uploaded ? (
            <Receive id={id} />
          ) : (
            <Send id={id} setUploaded={setUploaded} />
          )}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

function Send({ id, setUploaded }) {
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const [progress, setProgress] = useState(0);

  async function onDrop(files) {
    const file = files[0];
    const result = await uploadFile(ref(storageRef, id), file, {
      contentDisposition: `attachment; filename="${file.name}"`,
      customMetadata: {
        realFileName: file.name,
      },
    });
    setUploaded(true);

    // Schedule deletion after 1 minute
    setTimeout(() => {
      deleteUploadedFile(id);
    }, 30 * 60 * 1000); // 30 minutes in milliseconds
  }

  useWindowEvent("paste", (event) => {
    if (event.clipboardData.files.length) {
      onDrop(event.clipboardData.files);
    }
  });

  useEffect(() => {
    if (snapshot) {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    }
  }, [snapshot]);

  async function deleteUploadedFile(fileId) {
    try {
      await deleteObject(ref(storageRef, fileId));
      console.log("File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return (
    <>
      {uploading && (
        <div style={{ position: "relative", width: "100%", margin: "20px 0" }}>
          <Progress
            value={progress}
            style={{ width: "100%", height: "20px" }}
          />
          <Text
            size="sm"
            align="center"
            style={{
              position: "absolute",
              width: "100%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {progress.toFixed(2)}%
          </Text>
        </div>
      )}

      <Dropzone
        maxFiles={1}
        maxSize={1024 * 1024 * 1024} // 1 GB
        padding="xl"
        onDrop={onDrop}
        loading={uploading}
      >
        <Stack
          align="center"
          justify="center"
          spacing="lg"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          {import.meta.env.DEV && <Text c="dimmed">{id}</Text>}
          <IconUpload size={48} style={{ color: "#3457D5" }} />
          <Text size="xl" style={{ color: "#3457D5", fontWeight: "bold" }}>
            Drop a file here or click to select file
          </Text>
          <Text size="sm" c="dimmed">
            File size should not exceed 1 GB
          </Text>
        </Stack>
      </Dropzone>
    </>
  );
}

function Receive({ id }) {
  const url = window.location.origin + "/" + id;
  const { copied, copy } = useClipboard({ timeout: 1000 });

  const copyButton = (
    <ActionIcon onClick={() => copy(url)} color={copied ? "green" : ""}>
      <IconCopy size="70%" />
    </ActionIcon>
  );

  return (
    <Stack spacing="md" p="xl">
      <Group align="center">
        <ThemeIcon radius="xl" size="lg" color="green">
          <IconCheck size="70%" />
        </ThemeIcon>
        <Title>File uploaded</Title>
      </Group>

      <TextInput
        label="Download Link"
        value={url}
        readOnly
        rightSection={copyButton}
      />

      <Center>
        <Group spacing="xs">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </Group>
      </Center>

      <Center>
        <div style={{ background: "white", padding: "16px" }}>
          <QRCode value={url} />
        </div>
      </Center>
      <Center>
        <Text style={{ color: "#D2122E", font: "weight: bold" }}>
          Note: link expires with in 30 minutes.
        </Text>
      </Center>
      <Center>
        <Text c="dimmed">
          <Anchor onClick={() => window.location.reload()}>Refresh</Anchor>
          &nbsp;
          <Text span>this page to upload a new file.</Text>
        </Text>
      </Center>
    </Stack>
  );
}
