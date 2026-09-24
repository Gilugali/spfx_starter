import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export interface IDisaster {
  disasterNumber: number;
  incidentType: string;
  designatedArea: string;
  declarationDate: string;
}

export interface IDisasterDeclarationsSummariesResponse {
  DisasterDeclarationsSummaries: IDisaster[];
}

export function getLists(
  context: WebPartContext,
): Promise<IDisasterDeclarationsSummariesResponse> {
  const url: string = `${context.pageContext.web.absoluteUrl}/_api/web/lists`;
  return context.spHttpClient
    .get(url, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}. Check .spfx-workbench/api-mocks.json.`,
        );
      }
      return response.json();
    })
    .then((data: IDisasterDeclarationsSummariesResponse) => {
      if (Math.random() < 0.5) {
        throw new Error("Failed to fetch distater summary data.");
      }
      return data;
    });
}
