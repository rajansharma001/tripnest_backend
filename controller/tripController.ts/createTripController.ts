import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import { TripTypes } from "../../types";
import { Trip } from "../../models/tirpScehma";

export const createTrip = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const {
      tripTitle,
      currentLocation,
      tripLocation,
      budget,
      startDate,
      endDate,
      tripType,
      numberOfPeople,
    } = req.body as TripTypes;

    if (
      !tripTitle ||
      !currentLocation ||
      !tripLocation ||
      !budget ||
      !startDate ||
      !endDate ||
      !tripType ||
      !numberOfPeople
    ) {
      return res
        .status(404)
        .json({ error: "Please fill all required fields." });
    }

    const prompt = `
        I want you to act as a travel planner.

        Here are the trip details:
        - Starting from: ${currentLocation}
        - Destination: ${tripLocation}
        - Budget: ${budget}
        - Start Date: ${startDate}
        - End Date: ${endDate}
        - Trip Type: ${tripType} (e.g., leisure, adventure, honeymoon, family)
        - Number of People: ${numberOfPeople}

        Based on these details, please create a well-structured and exciting travel itinerary **strictly in JSON format** using the structure below:

        {
        "tripOverview": {
            "destination": "",
            "startDate": "",
            "endDate": "",
            "tripType": "",
            "numberOfPeople": 0,
            "duration": "",
            "budget": ""
        },
        "dailyPlan": [
            {
            "day": "",
            "title": "",
            "activities": [""]
            }
        ],
        "budgetBreakdown": {
            "totalBudget": "",
            "travel": "",
            "accommodation": "",
            "food": "",
            "activitiesAndTransport": "",
            "note": ""
        },
        "localTips": {
            "currency": "",
            "transport": "",
            "shopping": "",
            "dressCode": "",
            "safety": [""],
            "bestTimeToVisit": ""
        },
        "summary": {
            "highlights": [""],
            "recommendation": "",
            "extras": [""]
        }
        }

        Please ensure the response is valid JSON and includes friendly, helpful descriptions for each item. Do not include any extra text before or after the JSON output.
        `;

    const secret = process.env.GEN_AI_API as string;
    if (!secret) {
      return res.status(404).json({ error: "Gen AI api not found." });
    }
    const genAI = new GoogleGenerativeAI(secret);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const raw = response.candidates?.[0].content.parts?.[0].text;

    if (!raw) {
      return res.status(403).json({
        error: "Empty response from AI. Please try again.",
      });
    }
    const resJson = raw.replace(/```json|```/g, "").trim();

    if (!response) {
      return res.status(403).json({
        error:
          "Something went wrong while generating your trip. Please try again later.",
      });
    }
    let tripData: TripTypes;
    try {
      tripData = JSON.parse(resJson!) as TripTypes;
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON from AI." });
    }

    const createTrip = await Trip.create({
      tripOverview: tripData.tripOverview,
      dailyPlan: tripData.dailyPlan,
      budgetBreakdown: tripData.budgetBreakdown,
      localTips: tripData.localTips,
      summary: tripData.summary,
      currentLocation: currentLocation,
      tripTitle: tripTitle,
      tripLocation: tripLocation,
      startDate: startDate,
      endDate: endDate,
      tripType: tripType,
      numberOfPeople: numberOfPeople,
      userId: user._id,
    });

    if (!createTrip) {
      return res
        .status(402)
        .json({ error: "Trip creation failed. Please try again." });
    }

    return res.status(200).json({
      success: "Your trip has been generated successfully.",
      trip: createTrip,
    });
  } catch (error) {
    console.error("Error while creating trip:", error);

    return res.status(500).json({
      success: false,
      error: error || "Something went wrong while generating the trip.",
    });
  }
};
