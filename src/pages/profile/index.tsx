import { useParams } from "react-router-dom";
import Main from "../../layout/main";
import { useGetProfileByIdQuery } from "../../api/private-api";
import SetTitle from "../../components/set-title";
import BeatLoader from "react-spinners/BeatLoader";
import { Avatar, Card } from "@mantine/core";
import Container from "../../components/ui/container";
import SectionBlog from "./SectionBlog";
import SectionListing from "./SectionListing";

const CardProfile = ({ data }: { data: any }) => {
  const date = new Date(data?.joined);
  const joined = date.toLocaleDateString();
  return (
    <Card
      padding="md"
      radius="lg"
      withBorder
      style={{ boxShadow: " 0 6px 20px rgba(0,0,0,0.2)" }}
      className="flex h-fit shrink-0 items-center min-w-[250px] justify-center flex-col"
    >
      <Avatar src={data?.photoURL} size={90} className="mb-3" />
      <strong className="text-lg">{data?.name}</strong>
      <p className="text-sm text-secondary-400">Joined at {joined}</p>
    </Card>
  );
};
const Profile = () => {
  const { _id } = useParams();
  const { data, isLoading } = useGetProfileByIdQuery(_id);

  return (
    <Main>
      <SetTitle title={data?.name || "Profile"} />
      <Container className="py-16">
        {isLoading ? (
          <BeatLoader />
        ) : (
          <main className="flex gap-20">
            <CardProfile data={data} />
            <div className="flex-1">
              <h3>About {data?.name}</h3>
              <p className="min-w-0 break-words whitespace-pre-wrap text-secondary-500">
                {data?.introduction}
              </p>

              {data?._id && <SectionListing userId={data._id} />}
              {data?._id && <SectionBlog userId={data._id} />}
            </div>
          </main>
        )}
      </Container>
    </Main>
  );
};

export default Profile;
