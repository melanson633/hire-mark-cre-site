import EmailCaptureForm from "./EmailCaptureForm";

function ResourceGate({ resource, access, source }) {
  if (access.hasAccess) {
    return (
      <div className="resource-unlocked">
        <p>{resource.unlocked}</p>
        {resource.href && (
          <a className="button-secondary" href={resource.href}>
            Open resource
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="resource-locked">
      <EmailCaptureForm
        source={source}
        buttonLabel="Unlock"
        note="Unlock selected resources in this browser."
        onSuccess={access.grantAccess}
      />
    </div>
  );
}

export default ResourceGate;
