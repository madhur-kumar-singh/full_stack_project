import { Button } from "semantic-ui-react";
import styled from "styled-components";
import router from "next/router";
import { InferGetStaticPropsType } from "next";
import "semantic-ui-css/semantic.min.css";

export async function getServerSideProps(context: any) {
  const id = context.query.id;
  const getAPI = await fetch(`http://localhost:3000/api/results/${id}`, {
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

export default function Findings({
  resGet,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  const findings = resGet.data.findings;

  return (
    <>
      <OuterContainer>
        <table className="ui celled table">
          <thead style={{ backgroundColor: "rgba(34,36,38,.15)" }}>
            <tr>
              <th>Rule Id</th>
              <th>Description</th>
              <th>Severity</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="ruleId">{findings.ruleId}</td>
              <td data-label="description">{findings.metadata.description}</td>
              <td data-label="severity">{findings.metadata.severity}</td>
              <td data-label="path">{findings.location.path}</td>
            </tr>
          </tbody>
        </table>
      </OuterContainer>
      <div style={{display:'flex'}}>
        <Button
          style={{ margin: "2%", display: "flex", justifyContent: "flexend" }}
          onClick={() => {
            router.push("/");
          }}
        >
          Back to Home
        </Button>
        <Button
          style={{ margin: "2%", display: "flex", justifyContent: "flexend", }}
          onClick={() => {
            router.push("/results");
          }}
        >
          Back to Results
        </Button>
      </div>
    </>
  );
}
