import {
  Container,
  Text,
  Alert,
  AppShell,
  Button,
  Card,
  Center,
  Loader,
  Stack,
} from "@mantine/core";
import { getMetadata, getStorage, ref } from "firebase/storage";
import prettyBytes from "pretty-bytes";
import React, { useEffect, useMemo, useState } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { useParams } from "react-router-dom";
import { fbApp } from "@/db";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IconAlertTriangle } from "@tabler/icons-react";

const storage = getStorage(fbApp);

export default function Download() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>

      <AppShell.Main>
        <Content />
      </AppShell.Main>
    </AppShell>
  );
}

function Content() {
  const { id } = useParams();
  const fileRef = useMemo(() => ref(storage, id), [id]);
  const [downloadUrl, loading, error] = useDownloadURL(fileRef);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    getMetadata(fileRef).then((metadata) => {
      if (import.meta.env.DEV) console.log(metadata);
      setMeta(metadata);
    });
  }, [fileRef]);

  if (error) {
    return (
      <Center style={{ height: "100%" }}>
        <Alert
          title="File doesn't exist"
          color="red"
          radius="md"
          icon={<IconAlertTriangle size={32} />}
        >
          The link is invalid... Make sure you have the correct link.
        </Alert>
      </Center>
    );
  }

  if (loading || !meta) {
    return (
      <Center style={{ height: "100%" }}>
        <Loader variant="dots" />
      </Center>
    );
  }

  return (
    <Container size="xs">
      <Card shadow="sm" radius="md" p="lg" withBorder>
        <Stack spacing="md">
          <div>
            <span>Name </span>
            <Text weight={700} size="lg">
              {meta.customMetadata.realFileName}
            </Text>
          </div>
          <div>
            <span>Size </span>
            <Text weight={700} size="lg">
              {prettyBytes(meta.size)}
            </Text>
          </div>
          <div>
            <span>Type </span>
            <Text weight={700} size="lg">
              {meta.contentType}
            </Text>
          </div>
          <div>
            <span>Uploaded </span>
            <Text weight={700} size="lg">
              {new Date(meta.timeCreated).toLocaleString()}
            </Text>
          </div>
        </Stack>
        <Button
          color="#3457D5"
          radius="md"
          size="md"
          fullWidth
          mt="md"
          component="a"
          href={downloadUrl}
        >
          Download
        </Button>
      </Card>
    </Container>
  );
}
