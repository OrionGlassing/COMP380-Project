# LLM

This is where our LLM will live, in case you guys are curious about the process
our function calls will live in `views.py`, authentication and user models & their profiles
will live in `models.py`, and `urls.py` connects `views.py` and `models.py` to callable endpoints for 
the frontend. 

Nothing of proportionate value has been done in this directory yet, but when I update this endpoint, I will 
include details of what was updated, why it was updated, and if it affects the frontend in any way.

# Eventual Application of Function Call

In `mobile/src/api/client.js` create the function:

```javascript
const API_BASE =
  Platform.OS === "android"
    ? "http://10.0.2.2:8000"
    : "http://localhost:8000";

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```
On the Frontend when we use it:

```javascript
import { apiGet } from "./api/client";

const data = await apiGet("/ai/ping/");
```

