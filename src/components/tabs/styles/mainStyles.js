export const mainStyles = {
  page: {
    fontFamily: "'Courier New', monospace",
    fontSize: 16,
    zoom: 1.14,
    background: "#0a0a0f",
    minHeight: "100vh",
    color: "#e2e8f0",
    paddingBottom: 40
  },
  header: {
    background: "linear-gradient(135deg,#1e1b4b 0%,#0f172a 60%,#1a0e2e 100%)",
    padding: "22px 22px 14px",
    borderBottom: "1px solid #312e81"
  },
  shell: {
    maxWidth: 860,
    margin: "0 auto"
  },
  headerTitleRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap"
  },
  tabsOuter: {
    background: "#0f0f1a",
    borderBottom: "1px solid #1e1b4b",
    padding: "0 20px",
    overflowX: "auto"
  },
  tabsInner: {
    maxWidth: 860,
    margin: "0 auto",
    display: "flex",
    minWidth: "max-content"
  },
  content: {
    maxWidth: 860,
    margin: "0 auto",
    padding: "22px"
  }
};
