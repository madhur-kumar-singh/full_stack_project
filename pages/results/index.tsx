import { InferGetStaticPropsType } from "next";
import router from "next/router";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

export async function getServerSideProps() {
  const getAPI = await fetch("http://localhost:3000/api/form-input", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resGet = await getAPI.json();
  return {
    props: { resGet },
  };
}

const OuterContainer = styled.div`
  display: flex;
  justify-self: center;
  flex-direction: row;
  width: 90%;
  margin: auto;
  margin-top: 10px;
`;

export default function Results({
  resGet,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  return (
    <>
      <OuterContainer>
        <table className="ui celled table">
          <thead style={{ backgroundColor: "rgba(34,36,38,.15)" }}>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Findings</th>
            </tr>
          </thead>
          <tbody>
            {resGet.data.map((item: any) => (
              <tr>
                <td data-label="Name">{item.name}</td>
                <td data-label="Status">{item.status}</td>
                <td data-label="findings">
                  <Button
                    onClick={() => {
                      router.push("/results/" + item._id);
                    }}
                  >
                    Findings
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </OuterContainer>
      <Button
        style={{ margin: "2%", display: "flex", justifyContent: "flexend" }}
        onClick={() => {
          router.push("/");
        }}
      >
        Back to Home
      </Button>
    </>
  );
}
