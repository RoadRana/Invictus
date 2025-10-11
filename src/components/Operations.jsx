import { useEffect, useState } from "react";
import apiConfig from "../config/api";

// ---- URL helper to avoid double slashes ----
const joinURL = (base, path) =>
  new URL(path.replace(/^\/+/, ""), base.replace(/\/+$/, "/")).toString();

// ---- APIs ----
const ROLE_API = {
  list: joinURL(apiConfig.baseURL, "users/api/roles_list/"),
  create: joinURL(apiConfig.baseURL, "users/api/create_role/"),
  update: (id) => joinURL(apiConfig.baseURL, `users/api/update_role/${id}/`),
  del: (id) => joinURL(apiConfig.baseURL, `users/api/delete_role/${id}/`),
};

const ROBOT_TYPE_API = {
  list: joinURL(apiConfig.baseURL, "products/api/robot_type_list/"),
  get: (id) => joinURL(apiConfig.baseURL, `products/api/get_robot_type/${id}/`),
  create: joinURL(apiConfig.baseURL, "products/api/create_robot_type/"),
  update: (id) =>
    joinURL(apiConfig.baseURL, `products/api/update_robot_type/${id}/`),
  del: (id) =>
    joinURL(apiConfig.baseURL, `products/api/delete_robot_type/${id}/`),
};

// Component Type CRUD
const COMPONENT_TYPE_API = {
  list: joinURL(apiConfig.baseURL, "products/api/component_type_list/"),
  get: (id) =>
    joinURL(apiConfig.baseURL, `products/api/get_component_type/${id}/`),
  create: joinURL(apiConfig.baseURL, "products/api/create_component_type/"),
  update: (id) =>
    joinURL(apiConfig.baseURL, `products/api/update_component_type/${id}/`),
  del: (id) =>
    joinURL(apiConfig.baseURL, `products/api/delete_component_type/${id}/`),
};

// Component Model CRUD
const COMPONENT_MODEL_API = {
  list: joinURL(apiConfig.baseURL, "products/api/component_model_list/"),
  get: (id) =>
    joinURL(apiConfig.baseURL, `products/api/get_component_model/${id}/`), // optional
  create: joinURL(apiConfig.baseURL, "products/api/create_component_model/"),
  update: (id) =>
    joinURL(apiConfig.baseURL, `products/api/update_component_model/${id}/`),
  del: (id) =>
    joinURL(apiConfig.baseURL, `products/api/delete_component_model/${id}/`),
};

// Save Robot / Save Component (to lists)
const ROBOT_SAVE_URL = joinURL(apiConfig.baseURL, "products/api/robot_list/");
const COMPONENT_SAVE_URL = joinURL(
  apiConfig.baseURL,
  "products/api/component_model_list/"
);

// NEW: Services API
const SERVICE_API = {
  categories: joinURL(
    apiConfig.baseURL,
    "services/api/services_categories_list/"
  ),
  create: joinURL(apiConfig.baseURL, "services/api/create_service/"),
  update: (id) =>
    joinURL(apiConfig.baseURL, `services/api/update_service/${id}/`),
  del: (id) => joinURL(apiConfig.baseURL, `services/api/delete_service/${id}/`),
};

const H = () => {
  const t = localStorage.getItem("token") || apiConfig.token; // fallback for dev
  return {
    "Content-Type": "application/json",
    ...(t ? { Authorization: `Bearer ${t}` } : {}),
  };
};

// --- tiny UI atoms ---
const Card = ({ title, extra, children }) => (
  <div className="w-full max-w-5xl p-6 bg-white shadow-lg rounded-2xl ">
    <div className="flex items-center justify-between mb-4 ">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {extra}
    </div>
    {children}
  </div>
);

// white bg + primary text for selects
const LabeledSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={id}
      className="block w-full p-2.5 border rounded-lg bg-white text-primary"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) =>
        typeof o === "string" ? (
          <option key={o} value={o}>
            {o}
          </option>
        ) : (
          <option key={o.value} value={o.value}>
            {o.label ?? o.value}
          </option>
        )
      )}
    </select>
  </div>
);

export default function OperationsPage() {
  const [tab, setTab] = useState("staff");

  // ------- Staff (roles) -------
  const [roles, setRoles] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const r = await fetch(ROLE_API.list, { headers: H() });
      if (r.status === 401)
        return setMsg("Unauthorized: sign in or set a valid token.");
      if (!r.ok) return setMsg(`Roles failed: ${r.status} ${await r.text()}`);
      const j = await r.json();
      setRoles(j?.data || []);
    } catch (e) {
      setMsg(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);
  useEffect(() => {
    const sel = roles.find((x) => String(x.id) === String(id));
    setName(sel?.name || "");
    setDesc(sel?.description || "");
  }, [id, roles]);

  const saveRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = id ? ROLE_API.update(id) : ROLE_API.create;
      const method = id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify({ name, description: desc }),
      });
      setMsg(
        res.ok
          ? id
            ? "Role updated."
            : "Role created."
          : `Error ${res.status}`
      );
      if (res.ok) loadRoles();
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async () => {
    if (!id) return;
    if (!confirm("Delete this role?")) return;
    setLoading(true);
    try {
      const res = await fetch(ROLE_API.del(id), {
        method: "DELETE",
        headers: H(),
      });
      setMsg(res.ok ? "Role deleted." : `Error ${res.status}`);
      if (res.ok) {
        setId("");
        loadRoles();
      }
    } finally {
      setLoading(false);
    }
  };

  // ------- Robots & Components -------
  // Robot Types (CRUD)
  const [robotTypes, setRobotTypes] = useState([]); // [{id, name, description}]
  const [robotTypeId, setRobotTypeId] = useState("");
  const [robotTypeName, setRobotTypeName] = useState("");
  const [robotTypeDescription, setRobotTypeDescription] = useState("");

  // Component Types (CRUD)
  const [componentTypes, setComponentTypes] = useState([]); // [{id, name, description}]
  const [componentTypeId, setComponentTypeId] = useState("");
  const [componentTypeName, setComponentTypeName] = useState("");
  const [componentTypeDescription, setComponentTypeDescription] = useState("");

  // Component Models (CRUD)
  const [componentModels, setComponentModels] = useState([]); // [{id, name/ model_name, description/ meta_description }]
  const [componentModelId, setComponentModelId] = useState("");
  const [componentModelName, setComponentModelName] = useState("");
  const [componentModelDescription, setComponentModelDescription] =
    useState("");

  // Robot local fields
  const [robot, setRobot] = useState({
    model: "",
    icon: "",
  });

  // ------- Services (dynamic) -------
  const [serviceCategories, setServiceCategories] = useState([]); // [{id, name, description, services: [...] }]
  const [serviceCategoryId, setServiceCategoryId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  // Messages / loading
  const [rmsg, setRmsg] = useState("");
  const [rloading, setRloading] = useState(false);
  const [svcMsg, setSvcMsg] = useState("");
  const [svcLoading, setSvcLoading] = useState(false);

  // ---- Loaders (robots/components) ----
  const loadRobotTypes = async () => {
    try {
      setRloading(true);
      const r = await fetch(ROBOT_TYPE_API.list, { headers: H() });
      if (!r.ok) return setRmsg(`Robot types failed: ${r.status}`);
      const j = await r.json();
      setRobotTypes(j?.data || j || []);
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const loadRobotTypeDetail = async (rid) => {
    if (!rid) {
      setRobotTypeName("");
      setRobotTypeDescription("");
      return;
    }
    try {
      setRloading(true);
      const r = await fetch(ROBOT_TYPE_API.get(rid), { headers: H() });
      if (!r.ok) return setRmsg(`Get robot type failed: ${r.status}`);
      const j = await r.json();
      const d = j?.data ?? j;
      setRobotTypeName(d?.name ?? "");
      setRobotTypeDescription(d?.description ?? "");
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const loadComponentTypes = async () => {
    try {
      setRloading(true);
      const r = await fetch(COMPONENT_TYPE_API.list, { headers: H() });
      if (!r.ok) return setRmsg(`Component types failed: ${r.status}`);
      const j = await r.json();
      setComponentTypes(j?.data || j || []);
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const loadComponentTypeDetail = async (cid) => {
    if (!cid) {
      setComponentTypeName("");
      setComponentTypeDescription("");
      return;
    }
    try {
      setRloading(true);
      const r = await fetch(COMPONENT_TYPE_API.get(cid), { headers: H() });
      if (!r.ok) return setRmsg(`Get component type failed: ${r.status}`);
      const j = await r.json();
      const d = j?.data ?? j;
      setComponentTypeName(d?.name ?? "");
      setComponentTypeDescription(d?.description ?? "");
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const loadComponentModels = async () => {
    try {
      setRloading(true);
      const r = await fetch(COMPONENT_MODEL_API.list, { headers: H() });
      if (!r.ok) return setRmsg(`Component models failed: ${r.status}`);
      const j = await r.json();
      setComponentModels(j?.data || j || []);
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const loadComponentModelDetail = async (mid) => {
    if (!mid) {
      setComponentModelName("");
      setComponentModelDescription("");
      return;
    }
    try {
      setRloading(true);
      const r = await fetch(COMPONENT_MODEL_API.get(mid), { headers: H() });
      if (!r.ok) {
        // Optional endpoint; try to hydrate from list
        const found = componentModels.find((m) => String(m.id) === String(mid));
        setComponentModelName(found?.name ?? found?.model_name ?? "");
        setComponentModelDescription(
          found?.description ?? found?.meta_description ?? ""
        );
        return;
      }
      const j = await r.json();
      const d = j?.data ?? j;
      setComponentModelName(d?.name ?? d?.model_name ?? "");
      setComponentModelDescription(d?.description ?? d?.meta_description ?? "");
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  // ---- Loaders (services) ----
  const loadServiceCategories = async () => {
    try {
      setSvcLoading(true);
      const r = await fetch(SERVICE_API.categories, { headers: H() });
      if (!r.ok) return setSvcMsg(`Service categories failed: ${r.status}`);
      const j = await r.json();
      // expected: { data: [ { id, name, description, services: [ ... ] }, ... ] }
      setServiceCategories(j?.data || j || []);
    } catch (e) {
      setSvcMsg(e.message || "Network error");
    } finally {
      setSvcLoading(false);
    }
  };

  // Load lists when entering tabs
  useEffect(() => {
    if (tab === "robots") {
      loadRobotTypes();
      loadComponentTypes();
      loadComponentModels();
    } else if (tab === "services") {
      loadServiceCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  // Load details when selections change
  useEffect(() => {
    loadRobotTypeDetail(robotTypeId);
  }, [robotTypeId]);

  useEffect(() => {
    loadComponentTypeDetail(componentTypeId);
  }, [componentTypeId]);

  useEffect(() => {
    loadComponentModelDetail(componentModelId);
  }, [componentModelId]);

  // When changing service/category, hydrate form
  useEffect(() => {
    // clear service selection when category changes
    setServiceId("");
    setServiceName("");
    setServiceDescription("");
  }, [serviceCategoryId]);

  useEffect(() => {
    if (!serviceId) {
      setServiceName("");
      setServiceDescription("");
      return;
    }
    const cat = serviceCategories.find(
      (c) => String(c.id) === String(serviceCategoryId)
    );
    const svc = cat?.services?.find((s) => String(s.id) === String(serviceId));
    setServiceName(svc?.name ?? "");
    setServiceDescription(svc?.description ?? "");
  }, [serviceId, serviceCategoryId, serviceCategories]);

  // ---- Saves/Deletes (robots/components) ----
  const saveRobotType = async (e) => {
    e.preventDefault();
    setRloading(true);
    setRmsg("");
    try {
      const url = robotTypeId
        ? ROBOT_TYPE_API.update(robotTypeId)
        : ROBOT_TYPE_API.create;
      const method = robotTypeId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify({
          name: robotTypeName,
          description: robotTypeDescription,
        }),
      });
      if (!res.ok) return setRmsg(`Save failed: ${res.status}`);
      setRmsg(robotTypeId ? "Robot type updated." : "Robot type created.");
      await loadRobotTypes();
      if (!robotTypeId) setRobotTypeId("");
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const deleteRobotType = async () => {
    if (!robotTypeId) return;
    if (!confirm("Delete this robot type?")) return;
    setRloading(true);
    setRmsg("");
    try {
      const res = await fetch(ROBOT_TYPE_API.del(robotTypeId), {
        method: "DELETE",
        headers: H(),
      });
      if (!res.ok) return setRmsg(`Delete failed: ${res.status}`);
      setRmsg("Robot type deleted.");
      setRobotTypeId("");
      setRobotTypeName("");
      setRobotTypeDescription("");
      await loadRobotTypes();
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const saveComponentType = async (e) => {
    e.preventDefault();
    setRloading(true);
    setRmsg("");
    try {
      const url = componentTypeId
        ? COMPONENT_TYPE_API.update(componentTypeId)
        : COMPONENT_TYPE_API.create;
      const method = componentTypeId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify({
          name: componentTypeName,
          description: componentTypeDescription,
        }),
      });
      if (!res.ok) return setRmsg(`Save component type failed: ${res.status}`);
      setRmsg(
        componentTypeId ? "Component type updated." : "Component type created."
      );
      await loadComponentTypes();
      if (!componentTypeId) setComponentTypeId("");
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const deleteComponentType = async () => {
    if (!componentTypeId) return;
    if (!confirm("Delete this component type?")) return;
    setRloading(true);
    setRmsg("");
    try {
      const res = await fetch(COMPONENT_TYPE_API.del(componentTypeId), {
        method: "DELETE",
        headers: H(),
      });
      if (!res.ok)
        return setRmsg(`Delete component type failed: ${res.status}`);
      setRmsg("Component type deleted.");
      setComponentTypeId("");
      setComponentTypeName("");
      setComponentTypeDescription("");
      await loadComponentTypes();
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const saveComponentModel = async (e) => {
    e.preventDefault();
    setRloading(true);
    setRmsg("");
    try {
      const payload = {
        name: componentModelName,
        description: componentModelDescription,
        ...(componentTypeId ? { component_type: componentTypeId } : {}),
      };
      const url = componentModelId
        ? COMPONENT_MODEL_API.update(componentModelId)
        : COMPONENT_MODEL_API.create;
      const method = componentModelId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) return setRmsg(`Save component model failed: ${res.status}`);
      setRmsg(
        componentModelId
          ? "Component model updated."
          : "Component model created."
      );
      await loadComponentModels();
      if (!componentModelId) setComponentModelId("");
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const deleteComponentModel = async () => {
    if (!componentModelId) return;
    if (!confirm("Delete this component model?")) return;
    setRloading(true);
    setRmsg("");
    try {
      const res = await fetch(COMPONENT_MODEL_API.del(componentModelId), {
        method: "DELETE",
        headers: H(),
      });
      if (!res.ok)
        return setRmsg(`Delete component model failed: ${res.status}`);
      setRmsg("Component model deleted.");
      setComponentModelId("");
      setComponentModelName("");
      setComponentModelDescription("");
      await loadComponentModels();
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  // ---- Buttons: Save Robot & Save Component ----
  const saveRobotPOST = async () => {
    setRloading(true);
    setRmsg("");
    try {
      const payload = {
        robot_type: robotTypeId || null,
        model: robot.model || "",
        component_type: componentTypeId || null,
        component_model: componentModelId || null,
        icon: robot.icon || "",
      };
      const res = await fetch(ROBOT_SAVE_URL, {
        method: "POST",
        headers: H(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) return setRmsg(`Save robot failed: ${res.status}`);
      setRmsg("Robot saved to robot_list.");
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  const saveComponentPOST = async () => {
    setRloading(true);
    setRmsg("");
    try {
      const payload = {
        name: componentModelName,
        description: componentModelDescription,
        ...(componentTypeId ? { component_type: componentTypeId } : {}),
      };
      const res = await fetch(COMPONENT_SAVE_URL, {
        method: "POST",
        headers: H(),
        body: JSON.stringify(payload),
      });
      if (!res.ok)
        return setRmsg(`Save component (to list) failed: ${res.status}`);
      setRmsg("Component saved to component_model_list.");
      await loadComponentModels();
    } catch (e) {
      setRmsg(e.message || "Network error");
    } finally {
      setRloading(false);
    }
  };

  // ---- Service CRUD (create/update/delete) ----
  const saveService = async (e) => {
    e.preventDefault();
    if (!serviceCategoryId)
      return setSvcMsg("Select a Service Category first.");
    setSvcLoading(true);
    setSvcMsg("");
    try {
      const payload = {
        name: serviceName,
        description: serviceDescription,
        service_category: Number(serviceCategoryId),
      };
      const url = serviceId
        ? SERVICE_API.update(serviceId)
        : SERVICE_API.create;
      const method = serviceId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: H(),
        body: JSON.stringify(payload),
      });
      if (!res.ok)
        return setSvcMsg(
          `${serviceId ? "Update" : "Create"} service failed: ${res.status}`
        );
      setSvcMsg(serviceId ? "Service updated." : "Service created.");
      await loadServiceCategories();
      if (!serviceId) {
        // reset after create
        setServiceId("");
        setServiceName("");
        setServiceDescription("");
      }
    } catch (e) {
      setSvcMsg(e.message || "Network error");
    } finally {
      setSvcLoading(false);
    }
  };

  const deleteService = async () => {
    if (!serviceId) return;
    if (!confirm("Delete this service?")) return;
    setSvcLoading(true);
    setSvcMsg("");
    try {
      const res = await fetch(SERVICE_API.del(serviceId), {
        method: "DELETE",
        headers: H(),
      });
      if (!res.ok) return setSvcMsg(`Delete service failed: ${res.status}`);
      setSvcMsg("Service deleted.");
      await loadServiceCategories();
      setServiceId("");
      setServiceName("");
      setServiceDescription("");
    } catch (e) {
      setSvcMsg(e.message || "Network error");
    } finally {
      setSvcLoading(false);
    }
  };

  // Derived: services within the selected category
  const servicesInSelectedCategory = (() => {
    const cat = serviceCategories.find(
      (c) => String(c.id) === String(serviceCategoryId)
    );
    return cat?.services || [];
  })();

  return (
    <div className="min-h-screen bg-gray-850 my-20 ">
      {/* top bar */}
      <header className=" z-10 bg-white pt-3 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            Operations Dashboard
          </h1>
          <nav className="flex gap-2 text-primary">
            {["staff", "robots", "services"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium  
                  ${
                    tab === t
                      ? "bg-primary text-gray-200"
                      : "bg-gray-200 text-primary"
                  }`}
                aria-pressed={tab === t}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center gap-8 text-primary">
        {/* Staff */}
        {tab === "staff" && (
          <Card
            title="Staff Operations"
            extra={
              loading ? (
                <span className="text-xs text-primary">Loading…</span>
              ) : null
            }
          >
            {msg && (
              <div className="mb-4 p-3 rounded-lg text-sm bg-emerald-50 text-emerald-700">
                {msg}
              </div>
            )}

            <LabeledSelect
              id="roleSelect"
              label="Create / Select Role"
              value={id}
              onChange={setId}
              options={roles.map((r) => ({
                value: String(r.id),
                label: r.name,
              }))}
              placeholder="➕ Create New Role"
            />

            <form onSubmit={saveRole} className="space-y-4">
              <input
                className="w-full p-2.5 border rounded-lg bg-white text-primary"
                placeholder="Role name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                className="w-full p-2.5 border rounded-lg bg-white text-primary"
                rows={3}
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="flex flex-wrap gap-3">
                <button className="py-2.5 px-4 rounded-lg bg-primary text-white  hover:bg-primary-400">
                  {id ? "Update Role" : "Create Role"}
                </button>
                <button
                  type="button"
                  onClick={deleteRole}
                  disabled={!id}
                  className="py-2.5 px-4 rounded-lg bg-rose-800 text-white hover:bg-rose-700 disabled:opacity-50"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setId("");
                    setName("");
                    setDesc("");
                  }}
                  className="py-2.5 px-4 rounded-lg border hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Robots */}
        {tab === "robots" && (
          <Card
            title="Robot Operations"
            extra={
              rloading ? (
                <span className="text-xs text-primary">Working…</span>
              ) : null
            }
          >
            {rmsg && (
              <div className="mb-4 p-3 rounded-lg text-sm bg-amber-50 text-amber-700">
                {rmsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {/* Robot Type CRUD */}
              <div>
                <LabeledSelect
                  id="robotTypeSelect"
                  label="Create / Select Robot Type"
                  value={robotTypeId}
                  onChange={(v) => setRobotTypeId(v)}
                  options={robotTypes.map((rt) => ({
                    value: String(rt.id),
                    label: rt.name,
                  }))}
                  placeholder="➕ Create New Robot Type"
                />
                <form onSubmit={saveRobotType} className="space-y-3">
                  <input
                    className="w-full p-2.5 border rounded-lg bg-white text-primary"
                    placeholder="Robot Type Name"
                    value={robotTypeName}
                    onChange={(e) => setRobotTypeName(e.target.value)}
                    required
                  />
                  <textarea
                    className="w-full p-2.5 border rounded-lg bg-white text-primary"
                    rows={3}
                    placeholder="Description"
                    value={robotTypeDescription}
                    onChange={(e) => setRobotTypeDescription(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-3">
                    <button className="py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-400">
                      {robotTypeId ? "Update Type" : "Create Type"}
                    </button>
                    <button
                      type="button"
                      onClick={deleteRobotType}
                      disabled={!robotTypeId}
                      className="py-2.5 px-4 rounded-lg bg-rose-800 text-white hover:bg-rose-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRobotTypeId("");
                        setRobotTypeName("");
                        setRobotTypeDescription("");
                      }}
                      className="py-2.5 px-4 rounded-lg border hover:bg-gray-50"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              {/* Robot simple fields */}
              <div className="space-y-3">
                <LabeledSelect
                  id="robotModel"
                  label="Robot Model"
                  value={robot.model}
                  onChange={(v) => setRobot((s) => ({ ...s, model: v }))}
                  options={["RX100", "TX200", "ZX300"]}
                />
                <LabeledSelect
                  id="robotIcon"
                  label="Robot Icon"
                  value={robot.icon}
                  onChange={(v) => setRobot((s) => ({ ...s, icon: v }))}
                  options={["Robot Icon 1", "Robot Icon 2", "Robot Icon 3"]}
                />
              </div>

              {/* Component Type CRUD + Select */}
              <div>
                <LabeledSelect
                  id="componentType"
                  label="Component Type"
                  value={componentTypeId}
                  onChange={(v) => setComponentTypeId(v)}
                  options={componentTypes.map((ct) => ({
                    value: String(ct.id),
                    label: ct.name,
                  }))}
                  placeholder="➕ Create / Select"
                />
                <form onSubmit={saveComponentType} className="space-y-3">
                  <input
                    className="w-full p-2.5 border rounded-lg bg-white text-primary"
                    placeholder="Component Type Name"
                    value={componentTypeName}
                    onChange={(e) => setComponentTypeName(e.target.value)}
                    required
                  />
                  <textarea
                    className="w-full p-2.5 border rounded-lg bg-white text-primary"
                    rows={3}
                    placeholder="Description"
                    value={componentTypeDescription}
                    onChange={(e) =>
                      setComponentTypeDescription(e.target.value)
                    }
                  />
                  <div className="flex flex-wrap gap-3">
                    <button className="py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-400">
                      {componentTypeId ? "Update Type" : "Create Type"}
                    </button>
                    <button
                      type="button"
                      onClick={deleteComponentType}
                      disabled={!componentTypeId}
                      className="py-2.5 px-4 rounded-lg bg-rose-800 text-white hover:bg-rose-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setComponentTypeId("");
                        setComponentTypeName("");
                        setComponentTypeDescription("");
                      }}
                      className="py-2.5 px-4 rounded-lg border hover:bg-gray-50"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              {/* Component Model CRUD + Select */}
              <div>
                <LabeledSelect
                  id="componentModel"
                  label="Component Model"
                  value={componentModelId}
                  onChange={(v) => setComponentModelId(v)}
                  options={componentModels.map((cm) => ({
                    value: String(cm.id),
                    label: cm.name ?? cm.model_name,
                  }))}
                  placeholder="➕ Create / Select"
                />
                <form onSubmit={saveComponentModel} className="space-y-3">
                  <input
                    className="w-full p-2.5 border rounded-lg bg-white text-primary"
                    placeholder="Component Model Name"
                    value={componentModelName}
                    onChange={(e) => setComponentModelName(e.target.value)}
                    required
                  />
                  <textarea
                    className="w-full p-2.5 border rounded-lg bg-white text-primary"
                    rows={3}
                    placeholder="Description"
                    value={componentModelDescription}
                    onChange={(e) =>
                      setComponentModelDescription(e.target.value)
                    }
                  />
                  <div className="flex flex-wrap gap-3">
                    <button className="py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-400">
                      {componentModelId ? "Update Model" : "Create Model"}
                    </button>
                    <button
                      type="button"
                      onClick={deleteComponentModel}
                      disabled={!componentModelId}
                      className="py-2.5 px-4 rounded-lg bg-rose-800 text-white hover:bg-rose-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setComponentModelId("");
                        setComponentModelName("");
                        setComponentModelDescription("");
                      }}
                      className="py-2.5 px-4 rounded-lg border hover:bg-gray-50"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-400"
                onClick={saveRobotPOST}
              >
                Save Robot (POST robot_list)
              </button>

              <button
                className="py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-400"
                onClick={saveComponentPOST}
              >
                Save Component (POST component_model_list)
              </button>
            </div>
          </Card>
        )}

        {/* Services (dynamic categories + services) */}
        {tab === "services" && (
          <Card
            title="Service Operations"
            extra={
              svcLoading ? (
                <span className="text-xs text-primary">Working…</span>
              ) : null
            }
          >
            {svcMsg && (
              <div className="mb-4 p-3 rounded-lg text-sm bg-amber-50 text-amber-700">
                {svcMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LabeledSelect
                id="serviceCategory"
                label="Service Category"
                value={serviceCategoryId}
                onChange={setServiceCategoryId}
                options={serviceCategories.map((c) => ({
                  value: String(c.id),
                  label: c.name,
                }))}
                placeholder="Select Category"
              />

              <LabeledSelect
                id="serviceSelect"
                label="Create / Select Service"
                value={serviceId}
                onChange={setServiceId}
                options={servicesInSelectedCategory.map((s) => ({
                  value: String(s.id),
                  label: s.name,
                }))}
                placeholder="➕ Create New Service"
              />
            </div>

            <form onSubmit={saveService} className="space-y-4 mt-2">
              <input
                className="w-full p-2.5 border rounded-lg bg-white text-primary"
                placeholder="Service Name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
              <textarea
                className="w-full p-2.5 border rounded-lg bg-white text-primary"
                rows={3}
                placeholder="Description"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
              <div className="flex flex-wrap gap-3">
                <button className="py-2.5 px-4 rounded-lg bg-primary text-white hover:bg-primary-400">
                  {serviceId ? "Update Service" : "Create Service"}
                </button>
                <button
                  type="button"
                  onClick={deleteService}
                  disabled={!serviceId}
                  className="py-2.5 px-4 rounded-lg bg-rose-800 text-white hover:bg-rose-700 disabled:opacity-50"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setServiceId("");
                    setServiceName("");
                    setServiceDescription("");
                  }}
                  className="py-2.5 px-4 rounded-lg border hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </form>
          </Card>
        )}
      </main>
    </div>
  );
}
