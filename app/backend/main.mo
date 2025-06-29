import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";

actor {
  public func fund(project: Text, amount: Nat, backer: Principal): async Text {
    Debug.print("Funding project: " # project);
    Debug.print("Amount: " # Nat.toText(amount));
    Debug.print("Backer: " # Principal.toText(backer));
    return "Funding received: " # project;
  };
}
