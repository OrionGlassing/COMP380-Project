# CoKitchen

CoKitchen is a recipe app designed to make recipe creation, management, and cooking easier. It combines AI and user interactions to customize and create recipes that better serve the user's likes and dislikes.

## What Problem Does It Solve?

Cooking can be tough. But finding a recipe and organizing your cookbooks is at least half of the battle. There are too many sources to look through, none of them know anything about what you actually like to eat, it's difficult to search for what you're in the mood for, and customizing a recipe to your own liking means going off recipe — which can lead to disaster.

CoKitchen aims to solve these problems by introducing an AI-powered recipe generator that learns your taste, that you can talk to conversationally, and that can be easily customized.

## Features

The most novel features are **conversational recipe generation** and **rapid customization**.

**Conversational Recipe Generation** means converting abstract language to real recipes. For example, on a hot summer day you might be in the mood for something *"summery, bright, and islandy."* Traditional searching will struggle to find results, but an LLM can connect these concepts to exact flavor profiles and ingredients.

**Rapid Customization** is more straightforward — the LLM can make changes to any generated recipe in real-time based on user requests.

Recipes will be stored in a database, giving users the ability to like and save recipes to specific playlists to build their own organized cookbook all in one place. On top of this, by interacting with the user's database, the LLM can learn a user's taste to refine future recipes.

## Tech Stack

**Frontend**
- React Native / Expo
- TypeScript

**Backend**
- Firebase
- Python