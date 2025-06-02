const API_URL = "http://localhost:3000/projects";

// GET all projects
export async function getProjects() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch projects");
    return await response.json();
}

// GET single project by ID
export async function getProjectById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch project");
    return await response.json();
}

// POST - Add a new project
export async function addProject(newProject) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
    });
    if (!response.ok) throw new Error("Failed to add project");
    return await response.json();
}

// PUT - Update an existing project
export async function updateProject(id, updatedProject) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
    });
    if (!response.ok) throw new Error("Failed to update project");
    return await response.json();
}

// DELETE - Remove a project
export async function deleteProject(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete project");
    return true;
}


//SUBSCRIPTIONS
const API_NEWSLETTER = "http://localhost:3000/subscriptions";

export async function subscribeUser(user) {
    const res = await fetch(`${API_NEWSLETTER}?email=${user.email}`);
    const data = await res.json();
    if (data.length > 0) {
        throw new Error("Email already subscribed");
    }

    const response = await fetch(API_NEWSLETTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    if (!response.ok) throw new Error("Failed to subscribe");
    return await response.json();
}