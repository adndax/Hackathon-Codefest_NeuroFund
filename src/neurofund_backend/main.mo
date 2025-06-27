// main.mo
import Debug "mo:base/Debug";
import Time "mo:base/Time";

actor Main {
    public func greet(name : Text) : async Text {
        "Hello, " # name # "!"
    };
    
    public func getCurrentTime() : async Int {
        Time.now()
    };
}