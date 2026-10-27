
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Search, Plus, RefreshCw, Trash2, Pencil, Eye, X, Save
} from "lucide-react";
import api from "../services/api";
import { modules } from "../config/modules";

const labels = {
  name: "Name",
  registerNumber: "Register Number",
  employeeId: "Employee ID",
  code: "Subject Code",
  department: "Department",
  designation: "Designation",
  email: "Email",
  phone: "Contact Number",
  year: "Year",
  semester: "Semester",
  status: "Status",
  credits: "Credits",
  description: "Description",
  hod: "Head of Department",
  dateOfBirth: "Date of Birth",
  joiningDate: "Joining Date",
  studentName: "Student",
  courseName: "Subject",
  staffName: "Faculty",
  academicYear: "Academic Year",
  assessmentType: "Assessment Type",
  marksObtained: "Marks Obtained",
  maxMarks: "Maximum Marks",
  grade: "Grade",
  date: "Date",
  enrolledOn: "Enrollment Date",
  section: "Section",
  skillName: "Skill",
  category: "Category",
  proficiency: "Proficiency",
  score: "Score",
  remarks: "Remarks"
};

function pretty(key) {
  return labels[key] || key.replace(/([A-Z])/g, " $1")
    .replace(/^./, c => c.toUpperCase());
}

function display(value) {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.map(display).join(", ");
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !["_id", "__v", "createdAt", "updatedAt"].includes(key))
      .map(([key, val]) => `${pretty(key)}: ${display(val)}`)
      .join(" | ");
  }
  return String(value);
}

export default function ModulePage() {
  const { resource } = useParams();
  const navigate = useNavigate();
  const module = modules[resource];

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [json, setJson] = useState("{}");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/${resource}`);
      setRecords(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message ||
        "Unable to load records. Check the backend and MongoDB.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setRecords([]);
    setSelected(null);
    load();
  }, [resource]);

  const filtered = records.filter(record =>
    JSON.stringify(record).toLowerCase().includes(search.toLowerCase())
  );

  function openNew() {
    setEditing({ mode: "new", id: null });
    setJson("{}");
    setError("");
  }

  function openEdit(record) {
    const copy = { ...record };
    ["_id", "__v", "createdAt", "updatedAt"].forEach(key => delete copy[key]);
    setEditing({ mode: "edit", id: record._id });
    setJson(JSON.stringify(copy, null, 2));
    setError("");
  }

  async function save(event) {
    event.preventDefault();
    let body;
    try {
      body = JSON.parse(json);
    } catch {
      setError("Please enter valid JSON.");
      return;
    }

    setSaving(true);
    try {
      if (editing.mode === "new") {
        await api.post(`/${resource}`, body);
      } else {
        await api.put(`/${resource}/${editing.id}`, body);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save this record.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(record) {
    if (!window.confirm("Delete this record permanently?")) return;
    try {
      await api.delete(`/${resource}/${record._id}`);
      setSelected(null);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete this record.");
    }
  }

  async function openDetails(record) {
    setSelected({ ...record, loadingRelated: true });

    try {
      if (resource === "students") {
        const result = await api.get(
          `/student-academic/profile/${record._id}`
        );
        setSelected({
          ...record,
          academicProfile: result.data,
          loadingRelated: false
        });
      } else if (resource === "staff") {
        const result = await api.get("/allocations");
        const allocations = result.data?.data || [];
        setSelected({
          ...record,
          relatedRecords: allocations.filter(
            item => item.staffName === record.name
          ),
          loadingRelated: false
        });
      } else if (resource === "courses") {
        const result = await api.get("/allocations");
        const allocations = result.data?.data || [];
        setSelected({
          ...record,
          relatedRecords: allocations.filter(
            item => item.courseName === record.name
          ),
          loadingRelated: false
        });
      } else {
        setSelected({ ...record, loadingRelated: false });
      }
    } catch {
      setSelected({ ...record, loadingRelated: false });
    }
  }

  if (!module) {
    return <div className="alert alert-error">Unknown module.</div>;
  }

  const isProfileModule = ["students", "staff", "courses"].includes(resource);

  return (
    <div className="page-stack">
      <section className="module-intro">
        <div>
          <div className="eyebrow">ACADEMIC MANAGEMENT / RECORDS</div>
          <h1>{module.label}</h1>
          <p>{module.description}</p>
        </div>
        <button className="button button-primary" onClick={openNew}>
          <Plus size={16} /> Add record
        </button>
      </section>

      <section className="module-metrics">
        <div className="metric-card">
          <span className="metric-label">Total records</span>
          <strong>{records.length}</strong>
          <span className="metric-foot">Saved in this module</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Search results</span>
          <strong>{filtered.length}</strong>
          <span className="metric-foot">Matching records</span>
        </div>
      </section>

      {error && <div className="alert alert-error">{error}</div>}

      <section className="panel records-panel">
        <div className="records-toolbar">
          <div>
            <h2>{module.label} Records</h2>
            <p>Select a record to view its details.</p>
          </div>
          <div className="toolbar-actions">
            <label className="search-box">
              <Search size={15} />
              <input
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder={`Search ${module.label.toLowerCase()}...`}
              />
            </label>
            <button className="button button-light button-small" onClick={load}>
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Loading records...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <strong>No records found</strong>
            <p>Try another search or add a record.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            padding: 16
          }}>
            {filtered.map((record, index) => {
              const title =
                record.name || record.title || record.studentName ||
                record.staffName || record.courseName ||
                record.registerNumber || record.employeeId || record.code ||
                `Record ${index + 1}`;

              const subtitle =
                record.registerNumber || record.employeeId ||
                record.code || record.department || "";

              const visibleFields = Object.entries(record)
                .filter(([key, value]) =>
                  !["_id", "__v", "createdAt", "updatedAt"].includes(key) &&
                  value !== null && typeof value !== "object"
                )
                .slice(0, 5);

              return (
                <article key={record._id || index} className="panel" style={{
                  padding: 18,
                  minWidth: 0,
                  border: "1px solid #e3e8f1",
                  borderRadius: 12,
                  background: "#fff"
                }}>
                  <h3 style={{ margin: "0 0 5px", overflowWrap: "anywhere" }}>
                    {title}
                  </h3>
                  <p style={{ color: "#64748b", margin: "0 0 12px" }}>
                    {subtitle}
                  </p>

                  {visibleFields.map(([key, value]) => (
                    <p key={key} style={{
                      margin: "7px 0",
                      fontSize: 14,
                      overflowWrap: "anywhere"
                    }}>
                      <strong>{pretty(key)}:</strong> {display(value)}
                    </p>
                  ))}

                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 16
                  }}>
                    <button
                      className="button button-primary"
                      onClick={() => {
                        if (resource === "departments") {
                          navigate(`/departments/${record._id}`);
                        } else {
                          openDetails(record);
                        }
                      }}
                    >
                      <Eye size={15} /> View details
                    </button>
                    <button
                      className="button button-light"
                      onClick={() => openEdit(record)}
                      title="Edit record"
                    >
                      <Pencil size={15} /> Edit
                    </button>
                    <button
                      className="button button-light"
                      onClick={() => remove(record)}
                      title="Delete record"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section className="record-modal" onClick={event => event.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <h2>{selected.name || selected.studentName || selected.courseName || selected.employeeId}</h2>
                <p>{module.label} — Complete record</p>
              </div>
              <button className="icon-button" onClick={() => setSelected(null)}>
                <X size={18} />
              </button>
            </div>

            {Object.entries(selected)
              .filter(([key]) =>
                !["_id", "__v", "createdAt", "updatedAt",
                  "loadingRelated", "academicProfile", "relatedRecords"].includes(key)
              )
              .map(([key, value]) => (
                <p key={key} style={{ overflowWrap: "anywhere" }}>
                  <strong>{pretty(key)}:</strong> {display(value)}
                </p>
              ))}

            {selected.loadingRelated && <p>Loading related details...</p>}

            {selected.academicProfile && (
              <>
                <h3>Academic Profile</h3>
                {Object.entries(selected.academicProfile)
                  .filter(([key]) => !["_id", "__v", "studentId", "createdAt", "updatedAt"].includes(key))
                  .map(([key, value]) => (
                    <p key={key} style={{ overflowWrap: "anywhere" }}>
                      <strong>{pretty(key)}:</strong> {display(value)}
                    </p>
                  ))}
              </>
            )}

            {isProfileModule && selected.relatedRecords && (
              <>
                <h3>{resource === "staff" ? "Assigned Subjects" : "Faculty Allocations"}</h3>
                {selected.relatedRecords.length === 0 ? (
                  <p>No related allocation records found yet.</p>
                ) : selected.relatedRecords.map((item, index) => (
                  <div key={item._id || index} style={{
                    padding: 12, marginBottom: 8, background: "#f5f7fb", borderRadius: 8
                  }}>
                    {Object.entries(item)
                      .filter(([key]) => !["_id", "__v", "createdAt", "updatedAt"].includes(key))
                      .map(([key, value]) => (
                        <p key={key} style={{ margin: "4px 0" }}>
                          <strong>{pretty(key)}:</strong> {display(value)}
                        </p>
                      ))}
                  </div>
                ))}
              </>
            )}
          </section>
        </div>
      )}

      {editing && (
        <div className="modal-backdrop" onClick={() => setEditing(null)}>
          <form className="record-modal" onSubmit={save} onClick={event => event.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <h2>{editing.mode === "new" ? "Add record" : "Edit record"}</h2>
                <p>Enter valid JSON using the field names required by the backend.</p>
              </div>
              <button type="button" className="icon-button" onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>
            <textarea
              className="json-editor"
              value={json}
              onChange={event => setJson(event.target.value)}
              spellCheck="false"
              required
            />
            <div className="modal-actions">
              <button type="button" className="button button-light" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="button button-primary" disabled={saving}>
                <Save size={15} /> {saving ? "Saving..." : "Save record"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
